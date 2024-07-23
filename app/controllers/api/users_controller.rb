module Api 
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if @user.save
        render 'api/users/create', status: :created
      else 
        render json: {success: false}, status: :bad_request
      end
    end

    def show
      @user = User.find(params[:id])

      if @user
        render 'api/users/show', status: :ok
      else
        render json: {success: false}, status: :bad_request
      end
    end

    def update
      # puts params.inspect
      @user = User.find(params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@user

      # Rails.logger.info "Attempting to update user with params: #{user_params.inspect}"

      if @user.update(user_params)
        Rails.logger.info "Update successful: #{@user.reload.inspect}"
        render 'api/users/update', status: :ok
      else
        Rails.logger.info "Update failed: #{@user.errors.full_messages.join(", ")}"
        render json: {success: false}, status: :bad_request
      end
    end

    def destroy
      @user = User.find_by(id: params[:id])

      if @user.destroy
        render json: {success: true}, status: :ok
      else
        render json: {success: false}, status: :bad_request
      end
    end

    private

    def user_params 
      params.require(:user).permit(:username, :email, :password, :city, :state)
    end 
  end
end