module Api
  class SessionsController < ApplicationController
    # create new session
    def create
      @user = User.find_by(email: params[:user][:email])

      # check if user exists and password is correct
      if @user && (BCrypt::Password.new(@user.password) == params[:user][:password])
        session = @user.sessions.create
        cookies.permanent.signed[:brewery_session_token] = {
          value: session.token,
          httponly: true
        }

        render 'api/sessions/create', status: :created
      else
        render json: { success: false }, status: :bad_request
      end
    end

    # check if user is authenticated
    def authenticated
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render 'api/sessions/authenticated', status: :ok
      else
        render json: { authenticated: false }
      end
    end

    # destroy session
    def destroy
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        render json: { success: true }, status: :ok
      end
    end
  end
end
