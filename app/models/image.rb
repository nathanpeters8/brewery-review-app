class Image < ApplicationRecord
  belongs_to :user
  has_one_attached :upload

  validates :caption, length: {maximum: 100}
  validates :user, presence: true
end
