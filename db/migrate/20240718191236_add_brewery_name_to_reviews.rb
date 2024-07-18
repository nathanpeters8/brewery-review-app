class AddBreweryNameToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :brewery_name, :string
  end
end
