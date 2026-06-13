# Url Shortyy Client

React + Vite + Tailwind CSS frontend for the URL shortener.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` to your backend API root, for example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_PUBLIC_SHORT_URL_BASE=http://localhost:5000/api/v1/url
```

3. Install dependencies:

```bash
npm install
```

4. Start the frontend:

```bash
npm run dev
```

## Backend Endpoint Mapping

All backend assumptions are isolated in `src/services/api.js`.

Current assumptions:

- `POST /users/register` with multipart fields `username`, `fullName`, `email`, `password`, `profile`
- `POST /users/login`
- `POST /users/logout`
- `GET /users/current-user`
- `POST /url/shorten`
- `GET /url/history`

If your backend route names differ, update only `src/services/api.js`.

`VITE_PUBLIC_SHORT_URL_BASE` controls how short links are displayed when history records only include a `shortCode`.
