# Todo List App - Backend

This is the backend application for the Todo List App, built with Express.js and Prisma, using MySQL for data storage. It provides RESTful API endpoints for managing tasks.

## Prerequisites

- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **MySQL**: Ensure you have a MySQL server running and accessible
- **Prisma**: Used for database schema management and querying

## Setup Instructions

1. **Clone the Repository**

   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/minniexp/nooro-todo-backend.git
   cd nooro-todo-backend
   ```

2. **Install Dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3001
   DATABASE_URL=mysql://your_mysql_username:your_mysql_password@localhost:3306/to_do_db
   ```

   Adjust the `DATABASE_URL` to match your MySQL configuration.

4. **Setup MySQL Database**

   - Ensure your MySQL server is running.
   - Create a new database named `to_do_db` (or adjust the name in the `DATABASE_URL` if you prefer a different name):

     ```sql
     CREATE DATABASE to_do_db;
     ```

5. **Database Setup with Prisma**

   Initialize the database schema using Prisma:

   ```bash
   npx prisma migrate dev --name init
   ```

   This command will apply any pending migrations and create the necessary tables in your database.

6. **Start the Production Server**

   Start the production server with:

   ```bash
   npm start
   ```
   Frontend Repository is located at the following: https://github.com/minniexp/nooro-todo-frontend

## Project Structure

- **`src/index.ts`**: The main entry point of the application, responsible for setting up the server and initializing routes.
- **`src/routes`**: Contains API route definitions, mapping HTTP requests to their respective handlers.
- **`prisma/schema.prisma`**: Contains the Prisma schema definition, which models your database structure.

## Features

- **RESTful API**: Provides endpoints for CRUD operations on tasks.
- **Database Integration**: Uses MySQL with Prisma for database management.
- **Error Handling**: Implements robust error handling and logging.

## Assumptions
- **Character Limit for Task Items** : 240 characters
- **Timestamps** : Two timestamps are used to track the creation and update of each task.
- **ID Type** : The ID is sequnetial integer, starting from 1. 

## Future Work
- **Testing**: Add unit and integration tests to ensure code quality and reliability.
- **Encryption**: Add encryption to the id to protect the data.
- **Authentication**: Add authentication to the API to protect the data.
- **Rate Limiting**: Add rate limiting to the API to protect the data.

## Key Dependencies

- **Express**: A minimal and flexible Node.js web application framework.
- **Prisma**: An ORM for Node.js and TypeScript that helps manage database schemas and queries.
- **MySQL2**: A MySQL client for Node.js, used for connecting to the MySQL database.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing in Express.

## API Endpoints

### Tasks

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|-----------|
| GET | `/tasks` | Get all tasks | - | `{ data: Task[] }` |
| GET | `/tasks/edit/:id` | Get a specific task | - | `{ data: Task }` |
| POST | `/tasks` | Create a new task | `{ title: string, color: string }` | `{ data: Task }` |
| PUT | `/tasks/edit/:id` | Update a task | `{ title?: string, color?: string, completed?: boolean }` | `{ data: Task }` |
| DELETE | `/tasks/:id` | Delete a task | - | `{ data: Task }` |

### Task Interface

```typescript
interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Contact

For questions or support, please contact [minyyang35@gmail.com](mailto:minyyang35@gmail.com).
