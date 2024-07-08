Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/results/:query' => 'static_pages#results'
  get '/brewery/:id' => 'static_pages#brewery'
end
