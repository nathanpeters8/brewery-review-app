Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/results' => 'static_pages#results'
  get '/brewery/:id' => 'static_pages#brewery'
  get '/account' => 'static_pages#account'
end
