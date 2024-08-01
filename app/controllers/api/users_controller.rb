require 'cgi'

module Api 
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else 
        Rails.logger.info "Failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    def show
      @user = User.find(params[:id])

      if @user
        render 'api/users/show', status: :ok
      else
        Rails.logger.info "Failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    def update
      puts params.inspect
      @user = User.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@user

      Rails.logger.info "Attempting to update user with params: #{user_params.inspect}"

      if @user.update(user_params)
        Rails.logger.info "Update successful: #{@user.attributes.inspect}"
        render 'api/users/update', status: :ok
      else
        Rails.logger.info "Update failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    def destroy
      @user = User.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@user

      if @user.destroy
        render json: {success: true}, status: :ok
      else
        render json: {success: false}, status: :bad_request
      end
    end

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
      params.require(:user).permit(:city, :state, :email, :username, :password).tap do |user_params|
        if user_params[:password].blank?
          Rails.logger.debug "Password is blank, removing from user_params"
          user_params.delete(:password)
        else
          Rails.logger.debug "Password is present, keeping in user_params"
        end
      end
    end 
  end
end