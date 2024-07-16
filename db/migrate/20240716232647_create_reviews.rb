class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :brewery_id
      t.belongs_to :user, index: true, foreign_key: true
      t.integer :rating
      t.text :content
      
      t.timestamps
    end
  end
end
