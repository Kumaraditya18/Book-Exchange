# 📚 Book Exchange Portal

A full-stack Book Exchange Portal that enables users to list books for rent and borrow books from others. The application supports user authentication, role-based UI (owners and seekers), dynamic book listing with rental status, and basic search/filter functionality.

---

## 🔗 Live Demo

**Frontend (React + Tailwind)**: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)  
**Backend (Express + MongoDB)**: [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)

---

## 🧰 Tech Stack

### Frontend
- React
- Tailwind CSS
- React Hook Form
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- bcrypt (for password hashing)
- CORS

---

## 🚀 Features

### ✅ Core Features
- User Authentication (Login/Signup)
- Role-based dashboard:
  - **Owner**: Can list books, mark books as returned
  - **Seeker**: Can rent available books
- Add, view, and search books
- Toggle book status between `Available` and `Rented`
- Protected routes via localStorage

### 🎁 Bonus Features
- Search functionality (title, author, location)
- User-friendly UI with Tailwind
- Responsive design
- Owner can mark their books as returned
- Frontend + Backend separation
- Clean code structure with meaningful components

---

## 🔒 Roles

- **Owner**:
  - Can add books
  - Can view all listings
  - Can mark rented books as returned (only their own)
  
- **Seeker**:
  - Can rent available books
  - Can search/filter books
  - Cannot add or return books

---

## 📁 Folder Structure

```
book-exchange-portal/
├── client/           # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/book-exchange-portal.git
cd book-exchange-portal
```

---

### 2. Backend Setup (`server/`)

```bash
cd server
npm install
```

#### Create `.env` file inside `/server`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
```

```bash
npm start
```

---

### 3. Frontend Setup (`client/`)

```bash
cd ../client
npm install
```

#### Create `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 🤖 AI Tools Used

- ChatGPT (for bug fixes, UI suggestions, and README writing)

---

## 🔍 What’s Working

- User login and role-based dashboard ✅
- Add book with owner info ✅
- Search and filter books ✅
- Book status toggle (rent/return) ✅

---

## 🚧 What’s Not Working (Yet)

- Password validation or registration error handling ❌
- Email verification ❌
- Book images / file uploads ❌

---

## 📌 Deployment Suggestions

### Frontend:
- Vercel / Netlify (auto-deploy on GitHub push)

### Backend:
- Render / Railway / Cyclic (free tier available)

---

## 🤝 Contributions

Feel free to fork the repo and submit PRs. Suggestions are welcome!
