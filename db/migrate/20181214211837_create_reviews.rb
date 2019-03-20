class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :body
      t.string :author
      t.integer :rating
      t.string :image
      t.belongs_to :item, foreign_key: true

      t.timestamps
    end
  end
end
