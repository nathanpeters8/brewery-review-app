# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create!([
  { username: 'John', email: 'john@test.com', password: 'password', city: 'San Francisco', state: 'California' },
  { username: 'Jane', email: 'jane@test.com', password: 'password', city: 'San Francisco', state: 'California' },
  { username: 'Tom', email: 'tom@test.com', password: 'password', city: 'San Francisco', state: 'California' },
  { username: 'Bob', email: 'bob@test.com', password: 'password', city: 'San Francisco', state: 'California' },
])
