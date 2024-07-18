class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :brewery_id
      t.belongs_to :user, index: true, foreign_key: true
      t.text :caption

      t.timestamps
    end
  end
end
