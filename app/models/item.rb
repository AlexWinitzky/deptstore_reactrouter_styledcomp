class Item < ApplicationRecord
  validates :name, presence: true
  belongs_to :department
  has_many :reviews, dependent: :destroy
end
