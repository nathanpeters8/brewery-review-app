require 'cgi'

module Api 
  class UsersController < ApplicationController
    # create new user
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else 
        Rails.logger.info "Failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    # get user by id
    def show
      @user = User.find(params[:id])

      if @user
        render 'api/users/show', status: :ok
      else
        Rails.logger.info "Failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    # update user
    def update
      @user = User.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@user

      if @user.update(user_params)
        render 'api/users/update', status: :ok
      else
        Rails.logger.info "Update failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    # delete user
    def destroy
      @user = User.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@user

      if @user.destroy
        render json: {success: true}, status: :ok
      else
        render json: {success: false}, status: :bad_request
      end
    end

    # find user by username
    def find_username
      username = params[:username]
      @user = User.find_by(username: username)

      if @user
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end
    
    # find user by email
    def find_email
      encoded_email = params[:email]
      email = CGI.unescape(encoded_email)
      email += ".com"
      Rails.logger.info "email: #{email}"

      @user = User.find_by(email: email)

      if @user
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end

    private

    def user_params 
      params.require(:user).permit(:city, :state, :email, :username, :password, :profile_picture).tap do |user_params|
        user_params.delete(:password) if user_params[:password].blank?
      end
    end 
  end
end