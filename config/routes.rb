Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/results' => 'static_pages#results'
  get '/brewery/:id' => 'static_pages#brewery'
  get '/account' => 'static_pages#account'

  namespace :api do
    resources :users, only: [:create]
    resources :sessions, only: [:create]
    resources :reviews, only: [:create]

    delete '/logout' => 'sessions#destroy'
    get '/authenticated' => 'sessions#authenticated'
  end
end
