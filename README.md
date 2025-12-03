# 🏥 Real-Time Queue Management System (MEAN Stack)


![Stack](https://img.shields.io/badge/stack-MEAN-green.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

A professional, real-time token management system designed for high-traffic environments. Built with **TypeScript**, **Clean Architecture (Repository Pattern)**, and **WebSockets** for sub-second updates across Kiosk, Admin, and Display screens.

---

## 🚀 Key Features

* **⚡ Real-Time Synchronization:** Instant updates across all devices using `Socket.io`. No page refreshes required.
* **🖥️ Self-Service Kiosk:** Customer-facing interface for generating queue tokens with unique IDs.
* **🛠️ Admin Dashboard:** comprehensive control panel for staff to "Call", "Serve", and "Complete" tokens.
* **📺 Public Display System:** Large-screen interface showing "Now Serving" (Big) and "Up Next" (List).
* **🏗️ Clean Architecture:** Backend organized into Controllers, Services, Repositories, and Models.
* **🛡️ Type-Safety:** Full TypeScript implementation on both Backend (Node/Express) and Frontend (Angular).

---

## 🛠️ Tech Stack

### **Backend (API)**
* Runtime: Node.js
* Framework: Express.js
* Language: TypeScript
* Database: MongoDB (Atlas) + Mongoose
* Realtime: Socket.io
* Architecture: Repository Pattern

### **Frontend (Client)**
* Framework: Angular 17+ (Standalone Components)
* Styling: Bootstrap 5
* Communication: HTTP Client + Socket.io-client

---

## 📂 Project Structure

```
Queue-Management-System/
├── backend/                  
│   ├── src/
│   │   ├── config/           
│   │   ├── controllers/      
│   │   ├── models/           
│   │   ├── repositories/     
│   │   ├── routes/           
│   │   └── server.ts         
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                 
    ├── src/app/
    │   ├── components/
    │   │   ├── admin/        
    │   │   ├── display/      
    │   │   ├── kiosk/        
    │   └── services/         
    ├── package.json
    └── angular.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Angular CLI

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/queue_db
```

Run server:

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | /api/tokens      | Get all tokens             |
| POST   | /api/tokens      | Create new token           |
| PUT    | /api/tokens/:id  | Update token status        |

---

## 🔌 Socket Events

- `token_created`
- `token_updated`

---

## 👨‍💻 Usage Flow

Kiosk → Display → Admin → Real-time updates across all screens.

---

## 📝 Future Improvements
- [ ] JWT Admin Login
- [ ] Multi-Counter Support
- [ ] Ticket Printer Integration
- [ ] Daily Analytics Dashboard
