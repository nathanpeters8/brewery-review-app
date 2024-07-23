Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/results' => 'static_pages#results'
  get '/brewery/:id' => 'static_pages#brewery'
  get '/account' => 'static_pages#account'

  namespace :api do
    resources :users, only: [:create, :show, :update, :destroy]
    resources :sessions, only: [:create]
    resources :reviews, only: [:create, :destroy]
    resources :images, only: [:create]

    delete '/logout' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'
    get '/:brewery_id/brewery_reviews' => 'reviews#index_by_brewery'
    get '/:brewery_id/brewery_images' => 'images#index_by_brewery'
    get '/:user_id/user_reviews' => 'reviews#index_by_user'
    get '/:user_id/user_images' => 'images#index_by_user'
  end
end
