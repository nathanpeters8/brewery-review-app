Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/results' => 'static_pages#results'
end
