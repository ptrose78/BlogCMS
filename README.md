# Blog CMS

This is a light-weight blog CMS built with Next.js and Neon Database. It allows you to create, edit, delete, and manage blog posts in a user-friendly interface.

## Features

- **Create and edit posts**: Easily create new posts with titles, content, and excerpts. Update existing posts with the same options.
- **Post listing**: View a list of all existing posts with titles, featuring status, and archived status.
- **Delete posts**: Permanently remove unwanted posts from the system.
- **Archive posts**: Move posts to an archived state, hiding them from the main blog but allowing you to access them later if needed.
- **Login and Signup (Admin)**: Secure your CMS with username and password authentication for admin users.
- **Home Page Shell**: Includes the shell of a home page with a link to the blog page in the nav bar.

## Requirements

- Node.js and npm (or yarn) installed on your machine
- A Vercel account for deployment (optional)
- A database (Neon Database is used in this example)

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/ptrose78/BlogCMS.git
    ```

2. Install dependencies:

    ```bash
    cd BlogCMS
    npm install
    ```

## Configuration

1. Create a `.env.local` file in the project root directory.
2. Add the following environment variables to your `.env.local` file, replacing the placeholders with your actual values:

    ```env
    POSTGRES_URL=your_postgres_database_url
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    ```

3. Populate your database with a list of pre-approved usernames to restrict access to the CMS. Follow the steps below:

   1. Use your database client to insert usernames into the `users` table (or an equivalent table). Passwords will be created by users during the signup process.
   
   2. Example query for inserting approved usernames:
      ```sql
      INSERT INTO users (username) VALUES ('adminuser');
      ```

## Running the Application

1. Start the development server:

    ```bash
    pnpm dev 
    ```

    This will start the application on `http://localhost:3000` by default.

## Accessing the Admin Panel

1. Navigate to `http://localhost:3000/admin/auth/signup` in your web browser.
2. Use the signup page to create a new admin user.
3. `http://localhost:3000/admin/auth/login` serves as your point of access to the Blog CMS.

## Deployment

You can deploy this application to Vercel or any other hosting provider that supports Next.js applications. Follow the specific deployment instructions for your chosen provider.

## Code Structure

- `app/components`: Contains reusable React components for the post list, featured post, post card, and post form.
- `app/lib/data.ts`: Contains functions related to fetching, creating, updating, and deleting posts from the database.
- `app/api`: Contains server-side functions for handling secured login and signup requests.
- `app/admin`: Contains the cms side to create and managing posts.
- `app/blog`: Contains the public blog page displaying posts.


## Contributing

Feel free to fork this repository and contribute improvements. I welcome pull requests for bug fixes and new features.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
