# Employee Management System

This repository contains a **full-stack Employee Management System** built with:

- **Frontend (client):** React, TypeScript, Vite, Chakra UI  
- **Backend (server):** NestJS, Prisma ORM, Node.js  
- **Database:** Prisma schema with migrations (supports SQLite/Postgres)  

It allows administrators to manage employees, handle assignments, and store data in a structured database.

---

##  Project Structure
```
Employee-main/
 ├── client/             # Frontend (React + Vite + TS)
 │   ├── public/         # Static assets
 │   ├── src/            # Components, interfaces, theme
 │   └── package.json
 │
 ├── server/             # Backend (NestJS + Prisma)
 │   ├── prisma/         # Database schema & migrations
 │   ├── src/            # Controllers, services, modules
 │   └── package.json
 │
 └── .gitignore
```

---

##  Features
- Employee CRUD (create, read, update, delete)  
- Employee assignment management  
- REST API built with NestJS  
- Database layer with Prisma  
- Frontend with React + Vite + Chakra UI  
- Shared TypeScript types for consistency  
- Unit & E2E tests included  

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Employee-main.git
cd Employee-main
```

### 2. Backend (server)
```bash
cd server
npm install
```

- Create a `.env` file with your database connection string:
  ```env
  DATABASE_URL="file:./dev.db"   # SQLite (default)
  ```
- Run Prisma migrations:
  ```bash
  npx prisma migrate dev --name init
  ```
- Start the server:
  ```bash
  npm run start:dev
  ```

The API runs by default at [http://localhost:3000](http://localhost:3000).

---

### 3. Frontend (client)
```bash
cd ../client
npm install
npm run dev
```

The frontend runs by default at [http://localhost:5173](http://localhost:5173).

---

##  Usage
1. Start the backend (`server`) to expose the REST API.  
2. Start the frontend (`client`) to interact with the UI.  
3. Manage employees, assignments, and view data directly from the dashboard.  

---

##  Testing
Backend:
```bash
cd server
npm run test
```

---

##  Future Improvements
- Authentication & role-based permissions  
- Dashboard with analytics & reports  
- Export/import employee data (CSV/Excel)  
- Cloud database support (Postgres, MySQL)  

---
