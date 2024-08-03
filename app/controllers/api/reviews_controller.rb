module Api
  class ReviewsController < ApplicationController
    # create new review
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

    # get reviews by brewery
    def index_by_brewery
      @reviews = Review.where(brewery_id: params[:brewery_id]).order(created_at: :desc)
      render 'api/reviews/index'
    end

    # get reviews by user
    def index_by_user
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)
      user = session.user 

      return render json: {error: 'user not logged in'}, status: :unauthorized if !session

      @reviews = user.reviews.order(created_at: :desc)
      render 'api/reviews/index'
    end

    # destroy review
    def destroy
      token = cookies.signed[:brewery_session_token]
      session = Session.find_by(token: token)
      user = session.user 

      @review = user.reviews.find(params[:id])
      return render json: {error: 'review not found'}, status: :not_found if !@review

      if @review.destroy
        render json: {success: true}, status: :ok
      else
        render json: {success: false}, status: :bad_request
      end
    end

    private

    def review_params
      params.require(:review).permit(:rating, :content, :brewery_id, :brewery_name)
    end
  end
end