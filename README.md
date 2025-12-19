# Blog Admin Dashboard

A production-style **Blog Admin Dashboard** built as part of the **Frontend Developer Assessment for Edwid Tech Pvt. Ltd.**  
This project demonstrates real-world frontend skills including UI/UX, state management, persistence, and responsive design.

---

## 🚀 Live Demo

🔗 **Live URL (Vercel):**  
👉 blog-admin-dashboard-beta.vercel.app

---

## 🎯 Project Overview

This dashboard allows an admin to manage blogs with full **CRUD functionality**, including:

- Add new blogs
- Edit existing blogs
- Soft delete blogs
- Auto purge deleted blogs
- Search, filter, and paginate blog data
- Image validation and preview
- Local persistence using LocalStorage
- Fully responsive layout (Desktop + Mobile)

---

## 🧠 Brain Task Selected

### ✅ **Soft Delete with Auto Purge**

**Description:**
- Blogs are not permanently deleted immediately.
- Instead, they are marked as deleted using:
  - `isDeleted: true`
  - `deletedAt: timestamp`
- Deleted blogs are hidden from the UI.
- On application load, an **auto purge mechanism** permanently removes blogs that exceed the retention period.

**Why this approach?**
> This approach reflects real-world production systems where data is not immediately removed.  
> It allows recovery, auditing, and controlled cleanup while maintaining a clean user interface.

---

## ⚡ Quick Logic Task

- When editing a blog:
  - The **Save/Update button remains disabled** if no changes are made.
  - The button becomes active only when actual modifications occur.
- This prevents unnecessary updates and improves UX.

---

## 🧩 Features Implemented

### ✅ CRUD Operations
- Create Blog
- Read Blog List
- Update Blog
- Delete Blog (Soft Delete)

### 🔢 Pagination
- Displays **5 blogs per page**
- Page navigation controls
- Works seamlessly with search and filters

### 🔍 Search & Filters
- Search blogs by **title**
- Filter blogs by **status** (Draft / Published)
- Case-insensitive search

### 🖼️ Image Handling
- Accepts only **PNG / JPG**
- Image preview before saving
- Base64 storage for persistence

### 💾 Persistence
- Blog data stored in **LocalStorage**
- Data persists after page refresh
- Auto purge runs on reload

### ❌ Error Handling
- Empty required fields blocked
- Invalid image formats blocked
- Disabled save when no changes detected

---

## 📱 Responsive Layout

- Desktop:
  - Fixed sidebar
  - Full dashboard layout
- Mobile:
  - Sidebar hidden by default
  - Hamburger menu opens slide-in sidebar
  - Touch-friendly UI

---

## 🗂️ Folder Architecture

 src/
│── components/
│ ├── Sidebar.jsx # Sidebar navigation (desktop + mobile)
│ ├── Navbar.jsx # Top navigation bar
│ ├── BlogForm.jsx # Add/Edit blog form
│ ├── BlogList.jsx # Blog table, search, filter, pagination
│
│── pages/
│ └── Dashboard.jsx # Main dashboard (state management)
│
│── utils/
│ └── storage.js # LocalStorage helpers
│
│── App.jsx
│── main.jsx
│── index.css


**Architecture Note:**  
The `Dashboard` component acts as the single source of truth, while child components handle UI and user interactions.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks
- **Persistence:** LocalStorage
- **Deployment:** Vercel

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/DurgasiShankarRao/blog-admin-dashboard.git
cd blog-admin-dashboard
npm install
npm run dev

Open in browser and run
👉 http://localhost:5173


