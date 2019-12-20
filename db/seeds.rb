
9.times do
  item_num = rand(1..5)
  d = Department.create(
    name: Faker::Commerce.department,
    image: '',
  )
  item_num.times do
    review_num = rand(0..5)
    i = d.items.create(
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph_by_chars(256, false),
      price: Faker::Commerce.price(range = 0..1000.00, as_string = false),
      image: '',
      )
    review_num.times do
      i.reviews.create(
        title: Faker::Cannabis.health_benefit,
        body: Faker::FamousLastWords.last_words,
        author: Faker::Dune.character,
        rating: rand(1..5),
        image: Faker::Avatar.image,
      )
    end
  end
end

puts "Database seeded successfully."