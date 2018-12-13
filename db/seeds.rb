12.times do
  Department.create(
    name: Faker::Commerce.department,
    image: '',
  )
end
Department.all.each do 
  20.times do |i|
    department_id = i + 1
    Item.create(
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.paragraph_by_chars(256, false),
      price: Faker::Commerce.price(range = 0..1000.00, as_string = false),
      image: '',
      department_id: department_id,
      )
  end
end

puts "Database successfully seeded."