module Api
  class ReviewsController < ApplicationController
    def create
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)
      user = session.user 

      @review = user.reviews.new(review_params)

      if @review.save
        render 'api/reviews/create', status: :created
      else
        render json: {success: false}, status: :bad_request
      end
    end

    def index_by_brewery
      @reviews = Review.where(brewery_id: params[:brewery_id]).order(created_at: :desc)
      render 'api/reviews/index'
    end

    private

    def review_params
      params.require(:review).permit(:rating, :content, :brewery_id)
    end
  end
end