json.user do
  json.username @user.username
  json.email @user.email
  json.city @user.city 
  json.state @user.state
end