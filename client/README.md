# Gadgets

A full-stack e-commerce website with user login logic, database management, and most essential front-end features.

## Features

- **User Authentication:** Secure user authentication system allowing users to sign up and log in securely. JWT tokens are stored in local storage of the user, after they log in / sign up, and removed on the logout.
- **Login logic** Login and sign-up logic was combined to prevent an unnecessary amount of different login / sign-up pages, and for easier user experience.
- **Database Management:** Utilizes PostgreSQL database for storing user information.
- **Front-end Interface:** Provides a user-friendly front-end interface for browsing products, adding them to "cart" or "liked products", and managing user account details.
-**Local storage** Local storage is used to store liked and added-to-cart products for easier and more seamless user experience.

## Technologies Used

- **Front-end:**
  - React.js
  - React Router
  - Redux.js
  - TypeScript
  - Sass
  - Axios
  - Local storage

- **Back-end:**
  - Node.js
  - Express.js
  - Sequelize (ORM for PostgreSQL)

- **Database:**
  - PostgreSQL

## Deployment

- **Front-end:** Deployed to GitHub Pages.
- **Back-end:** Deployed to Heroku.

## Usage

To run this project locally:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd Gadgets`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

Make sure to set up environment variables for the back-end, including database connection strings and JWT secret key.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
