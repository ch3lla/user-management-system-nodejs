# User Management System

This is a user management system built with Node.js, MongoDB, Mongoose, Express, and EJS. It allows you to perform CRUD (Create, Read, Update, Delete) operations on user data.

## Features

- User Registration: Allows users to create an account by providing their basic information.
- User Listing: Displays a list of all users with their information.
- User Details: Allows you to view the details of a specific user.
- User Update: Enables updating user information, such as username, email, and password.
- User Deletion: Supports deleting a user from the system.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ch3lla/user-management-system.git
```

2. Navigate to the project directory:

```bash
cd user-management-system
```

3. Install the dependencies:

```bash
npm install
```

4. Configure the environment variables:

   - Create a `.env` file in the root directory of the project.
   - Specify the required environment variables in the `.env` file. For example:
   
     ```env
     PORT=3000
     MONGODB_URI=mongodb://localhost/user_management_system
     ```

5. Start the application:

```bash
npm start
```

6. Open your web browser and visit `http://localhost:3000` to access the user management system.

## Dependencies

The following dependencies are used in this project:

- connect-flash: A middleware for displaying flash messages in Express applications.
- dotenv: A module for loading environment variables from a .env file.
- ejs: A simple templating language used to generate dynamic HTML pages.
- express: A minimal and flexible web application framework for Node.js.
- express-ejs-layouts: A layout support plugin for Express and EJS.
- express-flash-messages: A middleware for storing and retrieving flash messages in Express applications.
- express-session: A middleware for managing sessions in Express applications.
- method-override: A middleware for enabling HTTP method override in Express applications.
- mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.


Please note that user authentication and authorization are not implemented in this version of the user management system.
