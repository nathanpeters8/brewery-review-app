json.image do
  json.brewery_id @image.brewery_id
  json.brewery_name @image.brewery_name
  json.caption @image.caption
  json.upload url_for(@image.upload) if @image.upload.attached?
  json.created_at @image.created_at

  json.user do
    json.id @image.user.id
    json.username @image.user.username
  end
end