# BreweryScout - A Craft Brewery Search and Review App

BreweryScout is a web application that allows users to search for craft breweries, read and write reviews, and upload images.

#### https://www.breweryscout.us

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Screenshot](#screenshot)
- [APIs](#apis)
- [General Approach](#general-approach)
- [Installation](#installation)
- [User Stories](#user-stories)
- [Wireframe](#wireframe)
- [Major Hurdles](#major-hurdles)
- [Video Demo](#video-demo)
- [Acknowledgements](#acknowledgements)

## Features

- **Brewery Search**: Find breweries by name, city or state.
- **User Reviews**: Read and write reviews for breweries.
- **Image Uploads**: Upload and view images associated with breweries.
- **User Authentication**: Sign up, log in, and manage user accounts.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies

### Front-end

- **React**: front-end JavaScript library to build user interfaces
- **SCSS**: preprocessor to write more maintainable and organized CSS
- **Bootstrap**: framework to build responsive and mobile-first websites

### Back-end

- **Ruby on Rails**: back-end framework to handle server-side logic, RESTful API, and database interactions
- **PostgresSQL**: relational database management system to store brewery data, reviews, and user information
- **AWS S3**: cloud storage service to store images uploaded by users

### Deployment

- **Heroku**: cloud platform to deploy and host the application
- **Namecheap**: domain registrar to register and manage the domain name

## Screenshot

![Screenshot of BreweryScout website](/app/assets/images/app_screenshot.png)

## APIs

- [Open Brewery DB](https://www.openbrewerydb.org/): Public open-source API to search for breweries by name, city, state, and type. Also provides brewery autocomplete suggestions.
- [Google Search API](https://developers.google.com/custom-search/v1/overview): Custom Search API to search for social media links related to breweries.
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started): Embed API to display a map of a breweries location.
- [City and State Search API](https://rapidapi.com/devXprite/api/city-and-state-search-api): Public API to search for cities by name in the United States.

## General Approach

The general approach to building BreweryScout was to first create a wireframe, conduct user test, and plan out the database schema and API endpoints. Next, I built the front-end of the application with React, and implemented responsive design and styling with Bootstrap and SCSS. I then built the back-end with Ruby on Rails, and implemented user authentication, brewery search, review creation Then, using AWS S3, I implemented user image uploads for breweries.

Once the general full-stack functionality was completed, I added other features such as brewery/city/state autocomplete suggestions, social media search, and Google Maps embed. I also implemented other front-end libraries such as [PrimeReact](https://primereact.org/), [React Bootstrap](https://react-bootstrap.netlify.app/), [FontAwesome](https://fontawesome.com/), and [React Select](https://react-select.com) to further enhance the user experience and design. All the while, I was continuously testing the application, fixing bugs and deploying changes to Heroku.

## Installation

Prerequisites:

- Ruby (3.1.2) [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
- Rails (>= 6.1.6.1) [Install Rails](https://guides.rubyonrails.org/v6.0/getting_started.html)
- Node.js (^16.17) [Install Node.js](https://nodejs.org/en/download/)
- Yarn (1.22.21) [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)
- WSL (Windows Subsystem for Linux) for Windows users [Install WSL](https://docs.microsoft.com/en-us/windows/wsl/install)

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
bundle install
yarn install
```

3. Create and migrate the database

```bash
rails db:create
rails db:migrate

# Optionally, seed the database with sample data
rails db:seed
```

4. Start the Rails server

```bash
rails s
```

5. (Optional) To get faster load times and auto compilations, in a separate terminal window, start the Webpack server

```bash
./bin/webpack-dev-server

# for Windows users:
ruby ./bin/webpack-dev-server
```

\*\* Alternatively to steps 4 and 5, you can start both servers with Foreman:

```bash
# Install Foreman
gem install foreman

# Create a `Procfile.dev` file in the root directory with following content:
rails: rails s -b 0.0.0.0 -p 3000
webpacker: ruby ./bin/webpack-dev-server

# Start the servers with Foreman
foreman start -f Procfile.dev
```

6. Navigate to `http://localhost:3000` in your browser

## User Stories

- As a user, I want to search for breweries by name, city, and state.
- As a user, I want to read/write reviews and give ratings for breweries.
- As a user, I want to upload images for breweries.
- As a user, I want to search for information such as phone numbers, addresses, websites, and social media links for breweries.

## Wireframe

![Wireframe of BreweryScout website](/app/assets/images/capstone-wireframe-edit.png)

## Major Hurdles

- **Responsive Design**: Implementing responsive design for both desktop and mobile devices was a challenge, especially on the brewery and account pages, where I had figure out what to do with a column of content on the left of the pages. On the brewery page, I had to implement a feature where the content would move into view when scrolling down the page, which took a while to figure out. After a lot of trial and error I was able to get it working with the help of Bootstrap and SCSS.
- **Editing Profile Info**: Implementing a feature where users could edit their profile information was a challenge, as I had to figure out how to update any specific piece of user information in the database without unintentionally changing the password, which was happening when first implemented. After some research and troubleshooting, I was able to fix the issue by adding back-end code to check if the password field was blank, and only update the password if it was not blank.

## Video Demo
<div>
  <a href="https://www.loom.com/share/cb3473d40ee746f1aa666047e49f3c8c">
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/cb3473d40ee746f1aa666047e49f3c8c-a5113ea830f1b1f9-full-play.gif">
  </a>
</div>

## Acknowledgements

- [Open Brewery DB](https://www.openbrewerydb.org/)
- [Google Custom Search API](https://developers.google.com/custom-search/v1/overview)
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- [City and State Search API](https://rapidapi.com/devXprite/api/city-and-state-search-api)
- [PrimeReact](https://primereact.org/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [FontAwesome](https://fontawesome.com/)
- [React Select](https://react-select.com)
- [Namecheap](https://www.namecheap.com/)
- [Heroku](https://www.heroku.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Bootstrap](https://getbootstrap.com/)
- [Ruby on Rails](https://rubyonrails.org/)
- [React](https://reactjs.org/)
- [PostgresSQL](https://www.postgresql.org/)
- [SCSS](https://sass-lang.com/)
- [Unsplash](https://unsplash.com/)
