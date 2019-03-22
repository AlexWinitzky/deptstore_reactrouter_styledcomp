Rails.application.routes.draw do
  namespace :api do
    resources :departments do
      resources :items
    end
    resources :items do
      resources :reviews
    end
  end
end
