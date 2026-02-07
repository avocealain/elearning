# 🎓 LMS Platform

A modern Learning Management System (LMS) designed to deliver a seamless digital learning experience for both students and educators.

This platform enables teachers to create and manage courses while allowing students to enroll, learn, and track their progress efficiently.

Built with a scalable architecture and modern technologies, this project aims to simulate a real-world EdTech product.

---

## 🚀 Tech Stack

**Backend**
- Laravel
- RESTful architecture
- Role-based authorization

**Frontend**
- React.js with Inertia.js
- Tailwind CSS
- Modern SaaS-inspired UI

**Database**
- MySQL

**Dev Tools**
- Git & GitHub
- Composer
- NPM

---

## ✨ Core Features

### 🔐 Authentication & Security
- Secure login and registration
- Role-based access control (Admin / Teacher / Student)
- Protected routes

### 👨‍🏫 Teacher Capabilities
- Create and manage courses
- Upload lessons and resources
- Manage student enrollments
- Track learner progress

### 👨‍🎓 Student Experience
- Browse available courses
- Enroll in courses
- Follow structured lessons
- Track completion progress

### 📊 Dashboard
- Clean SaaS-style interface
- Course statistics
- Progress overview

---

## 🧠 Project Goals

This project was built to:

- Apply modern full-stack development practices  
- Design a scalable LMS architecture  
- Follow professional UI/UX standards  
- Simulate a production-ready web application  

---

## ⚙️ Installation Guide

Follow these steps to run the project locally.

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY

2️⃣ Install dependencies
composer install
npm install

3️⃣ Environment setup

Copy the environment file:
cp .env.example .env

Generate the application key:

php artisan key:generate

4️⃣ Configure database

Update your .env file with your database credentials:

DB_DATABASE=your_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

Run migrations:

php artisan migrate

5️⃣ Build frontend assets
npm run build


For development:

npm run dev

6️⃣ Start the server
php artisan serve

Visit:

http://127.0.0.1:8000
