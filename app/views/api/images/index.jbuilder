json.images do
  json.array! @images do |image|
    json.id image.id
    json.brewery_id image.brewery_id
    json.caption image.caption
    json.upload url_for(image.upload) if image.upload.attached?
    json.created_at image.created_at

    json.user do
      json.id image.user.id
      json.username image.user.username
    end
  end
end