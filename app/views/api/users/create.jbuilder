json.user do
  json.user_id @user.id
  json.username @user.username
  json.email @user.email
  json.city @user.city 
  json.state @user.state
  json.profile_picture url_for(@user.profile_picture) if @user.profile_picture.attached?
end