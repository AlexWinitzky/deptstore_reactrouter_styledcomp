Rails.application.routes.draw do
  namespace :api do
    resources :departments do
      resources :items
    end
  end

  namespace :api do
    resources :items do
      resources :reviews
    end
  end
end
