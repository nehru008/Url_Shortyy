# URL Shortener

A full-stack URL Shortener application built with Node.js, Express, MongoDB, and React.

## Features

* Create short URLs from long URLs
* Redirect users using short URLs
* Track click counts
* User authentication
* View URL history
* Analytics for shortened URLs

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Frontend

* React.js
* Vite
* Axios
* React Router

## Project Structure

```txt
URL-Shortener/
│
├── client/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── db/
│   │
│   └── package.json
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd URL-Shortener
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### URL Routes

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | /api/url/shorten | Create short URL         |
| GET    | /:shortCode      | Redirect to original URL |
| GET    | /api/url/history | Get user's URL history   |

### Authentication Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |
| POST   | /api/auth/logout   | Logout user   |

## Future Improvements

* Custom short URLs
* QR code generation
* URL expiration
* Advanced analytics dashboard
* Rate limiting
* URL categories and tags

## Author

Nehru Sharma
