# 🚗 DriveZen – Vehicle Rental Management API

**Live URL:** https://drive-zen.vercel.app/

DriveZen is a backend service for managing vehicle rentals, customers, and bookings.  
It is built using **Node.js**, **Express**, **TypeScript**, and **JWT authentication**, designed for production-ready performance and clean architecture.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based login and protected routes  
- Role-based access (Admin, Customer)

### 🚘 Vehicle Management
- Add, update, delete vehicles  
- Track vehicle availability  
- View all vehicles with details (type, registration number, daily rent)

### 👤 Customer Management
- Register new customers  
- Manage customer profiles  
- Retrieve customer list (role-based)

### 🧾 Booking Management
- Create new bookings  
- Validate date ranges  
- Calculate total price automatically  
- Update booking status (active, cancelled, returned)  

### 📦 Technology Stack

| Category | Technology |
|---------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | PostgreSQL / pg |
| Auth | JSON Web Token (JWT) |
| Tools | dotenv, bcryptjs, ts-node-dev |
| Deployment | Vercel |

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/drive-zen.git
cd drive-zen

### 2️⃣ Install Dependencies
```bash
npm install

### 3️⃣ Create .env File
```bash
PORT=5000
DATABASE_URL=your-postgres-connection-url
JWT_SECRET=your-secret-key

### 4️⃣ Run the Project in Development Mode
```bash
npm run dev

### 5️⃣ Build and Run Production
```bash
npm run build
npm start

## 🔑 Authentication

### Use JWT token in Authorization header:

```bash
makefile

Authorization: Bearer YOUR_TOKEN


## 🚀 Deployment
- Works with Vercel
- Environment variables must be set in deployment dashboard
-Build command:
```bash
npm run build




