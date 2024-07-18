class AddBreweryNameToImages < ActiveRecord::Migration[6.1]
  def change
    add_column :images, :brewery_name, :string
  end
end
