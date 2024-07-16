class Review < ApplicationRecord
  belongs_to :user

  validates :user, presence: true
  validates :rating, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 6 }
  validates :content, presence: true, length: { minimum: 5, maximum: 500 }

end
