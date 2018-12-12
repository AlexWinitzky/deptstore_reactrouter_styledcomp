class AddImageToDepartment < ActiveRecord::Migration[5.2]
  def change
    add_column :departments, :image, :string
  end
end
