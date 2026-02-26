# 🚗 SmartPark — Smart Parking Lot Management System
Live Deployed link - https://smart-parking-lot-tau.vercel.app/
A full-stack MERN application to manage and auto-allocate parking slots.

## ✨ Features

- **Add Parking Slot** — Create slots with EV charging & covered parking options
- **View All Slots** — Filter by availability, EV, covered; search by slot number
- **Park Vehicle** — Auto-allocate the nearest available matching slot (`ParkVehicle(needsEV, needsCover)`)
- **Remove Vehicle** — Free up a slot with one click
- **Dashboard** — Live stats and visual slot grid
- **Fully Responsive** — Mobile-first design

## 🏗️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 18, React Router v6, Context API  |
| Styling   | Pure CSS, CSS Variables, Google Fonts   |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB + Mongoose                      |
| HTTP      | Axios (with global interceptors)        |
| Toasts    | React Hot Toast                         |

## 📁 Project Structure

```
smart-parking/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/      # Error handler, notFound
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── utils/           # ApiError, ApiResponse, asyncHandler
│   │   └── server.js        # Entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/         # Global state (ParkingContext)
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # Axios API layer
│   │   └── utils/
│   ├── public/
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🚀 Getting Started

## 🔧 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/smart-parking
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| GET    | /api/slots            | Get all slots (filterable)           |
| GET    | /api/slots/stats      | Get dashboard statistics             |
| POST   | /api/slots            | Add a new slot                       |
| DELETE | /api/slots/:id        | Delete a slot                        |
| POST   | /api/slots/park       | Park vehicle (auto-allocate)         |
| PUT    | /api/slots/:id/remove | Remove vehicle from slot             |
| GET    | /api/health           | Health check                         |



## 🚀 Deployment

### Backend (Render)
1. Push to GitHub
2. Create new Web Service on Render
3. Set root directory: `backend`
4. Build: `npm install` | Start: `npm start`
5. Add all env variables

### Frontend (Vercel/Netlify)
1. Set root directory: `frontend`
2. Build: `npm run build`
3. Set `REACT_APP_API_URL` to your Render backend URL

## 🎯 Key Design Decisions

- **Nearest Slot Allocation**: Uses MongoDB `sort({ slotNo: 1 })` to always pick the lowest available matching slot
- **Global Error Handling**: Express middleware catches all async errors uniformly
- **Global API Response Class**: Consistent `{ success, statusCode, data, message }` shape
- **CORS**: Configured to allow multiple origins via env variable

## 📝 Git Commit Guide

```bash
git init
git add .
git commit -m "feat: initial project scaffold with MERN stack"

# After backend:
git commit -m "feat(backend): add parking slot CRUD API with park/remove logic"

# After frontend:
git commit -m "feat(frontend): add responsive UI with dashboard, slots, park pages"
```
