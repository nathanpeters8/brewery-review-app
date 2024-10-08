class User < ApplicationRecord
  has_many :sessions
  has_many :reviews, dependent: :destroy
  has_many :images, dependent: :destroy
  has_one_attached :profile_picture

  validates :username, presence: true, length: { minimum: 3, maximum: 20 }
  validates :password, presence: true, length: { minimum: 8 }
  validates :email, presence: true, length: { minimum: 5, maximum: 50 }

  validates_uniqueness_of :username
  validates_uniqueness_of :email

  before_save :hash_password, if: :password_present?

  private
  
  def hash_password
    self.password = BCrypt::Password.create(password)
  end

  def password_present?
    password.present? && password_changed?
  end
end
