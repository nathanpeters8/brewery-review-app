module Api
  class ImagesController < ApplicationController
    def create
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)
      user = session.user 

      @image = user.images.new(image_params)

      if @image.save
        render 'api/images/create', status: :created
      else
        render json: {success: false}, status: :bad_request
      end
    end

    def index_by_brewery
      @images = Image.where(brewery_id: params[:brewery_id]).order(created_at: :desc)
      render 'api/images/index'
    end

    private

    def image_params
      params.require(:image).permit(:upload, :caption, :brewery_id)
    end
  end
end