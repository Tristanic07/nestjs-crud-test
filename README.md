# nestjs-crud-test

 This is a full-stack todo-list application built as a showcase for a job interview. It features a robust backend built with NestJS and a dynamic frontend developed with React.

 ## 🛠️ Technologies & Tools

**Frontend:**
* React
* Tailwind CSS

**Backend:**
* NestJS
* Prisma

**Database:**
* PostgreSQL

**Deployment/DevOps:**
* GitHub

  ## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
* Node.js (v18 or higher)
* PostgreSQL

### Installation

1.  **Clone the repository:**
    gh repo clone Tristanic07/nestjs-crud-test
    cd todo-list
    
2.  **Install dependencies:**
    * Navigate to the backend and frontend folders and install their dependencies separately.
    
    cd backend
    npm install
    cd ../frontend
    npm install
    
3.  **Configure the database:**
    * Create a PostgreSQL database and update the connection string in your backend's `.env` file.
    * Run database migrations to set up the necessary tables.

    cd backend
    npx prisma migrate dev --name init
    
4.  **Start the backend server:**
    * Open a new terminal, navigate to the `backend` folder, and start the server.
    
    cd backend
    npm run start:dev
    
5.  **Start the frontend application:**
    * Open another new terminal, navigate to the `frontend` folder, and start the Next.js development server.
    
    cd frontend
    npm run dev


