# 📚 Book Review Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to browse, review, and manage books. Users can register, log in, view their profile, and leave reviews. Admin users can manage book listings.

---

## 🌐 Live Demo

- 🔗 (https://book-review-mocha.vercel.app/)


---

## 🛠️ Tech Stack

### 🔹 Frontend

- React.js
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### 🔹 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## ✨ Features

- 🔐 User Registration & Login with JWT
- 🙋 User Profile view and update (name, email, password)
- 📚 Paginated list of books
- 🔍 Search books by title or author
- 📝 Leave reviews on books (authenticated users)
- 👮 Admin-only book management
- 🧭 Fully responsive, clean UI with Tailwind CSS

---

## 📁 Folder Structure

book-review-platform/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── App.jsx
│ ├── main.jsx
│ └── .env


---

## ⚙️ Installation

### ✅ Prerequisites

- Node.js
- MongoDB (Atlas or local)
- npm or yarn

---

## 🚀 Backend Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/book-review-platform.git
cd book-review-platform/backend

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env

.env file example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000

# 4. Start the backend server
npm run dev

📍 API now runs at: http://localhost:5000/api
💻 Frontend Setup

# 1. Move to frontend directory
cd ../frontend

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env

.env file example:

REACT_APP_BASE_URL=http://localhost:5000/api

# 4. Run the React app
npm start