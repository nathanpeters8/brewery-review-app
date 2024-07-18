json.reviews do
  json.array! @reviews do |review|
    json.rating review.rating
    json.content review.content
    json.brewery_id review.brewery_id
    json.brewery_name review.brewery_name
    json.created_at review.created_at
    json.updated_at review.updated_at

    json.user do
      json.id review.user.id
      json.username review.user.username
    end
  end
end