# 🔗 URL Shortener — REST API

A simple, efficient, and production-quality **URL Shortener** REST API built with **Node.js**, **Express.js**, and **MongoDB**. Created as part of the **CodeAlpha Backend Development Internship**.

---

## ✨ Features

- Shorten long URLs into compact, unique short links
- Redirect users to original URLs using short codes
- Duplicate URL detection — returns existing short code instead of creating a new one
- URL validation using the `validator` library
- Unique short code generation using `nanoid`
- Centralized error handling middleware
- Clean, modular, and well-documented codebase
- Environment variable configuration with `dotenv`
- CORS enabled for cross-origin requests

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| nanoid | Unique short code generation |
| validator | URL validation |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Development auto-restart |

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud — e.g., MongoDB Atlas)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/url-shortener.git

# 2. Navigate to the project directory
cd url-shortener

# 3. Install dependencies
npm install

# 4. Configure environment variables
# Edit the .env file with your MongoDB URI

# 5. Start the development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/urlshortener` |
| `BASE_URL` | Base URL for generating short URLs | `http://localhost:5000` |

---

## 📡 API Documentation

### 1. Shorten a URL

**Endpoint:** `POST /api/url/shorten`

**Request Body:**

```json
{
  "url": "https://example.com/very/long/url"
}
```

**Success Response (201 Created):**

```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123xy",
  "shortUrl": "http://localhost:5000/abc123xy"
}
```

**Duplicate URL Response (200 OK):**

```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc123xy",
  "shortUrl": "http://localhost:5000/abc123xy"
}
```

**Validation Error Response (400 Bad Request):**

```json
{
  "message": "Please provide a valid URL (include http:// or https://)"
}
```

---

### 2. Redirect to Original URL

**Endpoint:** `GET /:shortCode`

**Success:** Redirects (HTTP 302) to the original URL.

**Not Found Response (404):**

```json
{
  "message": "URL not found"
}
```

---

## 📁 Folder Structure

```
url-shortener/
│
├── config/
│   └── db.js                 # MongoDB connection configuration
│
├── controllers/
│   └── urlController.js      # Business logic for URL operations
│
├── models/
│   └── Url.js                # Mongoose schema for URL documents
│
├── routes/
│   └── urlRoutes.js          # Express route definitions
│
├── middleware/
│   └── errorMiddleware.js    # Centralized error handling
│
├── utils/                    # Utility functions (extensible)
│
├── .env                      # Environment variables
├── package.json              # Project dependencies and scripts
├── server.js                 # Application entry point
└── README.md                 # Project documentation
```

---

## 🧪 Example Requests

### Using cURL

**Shorten a URL:**

```bash
curl -X POST http://localhost:5000/api/url/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.google.com"}'
```

**Redirect:**

```bash
curl -L http://localhost:5000/abc123xy
```

### Using Postman

1. **Open Postman** and create a new request.
2. **Shorten URL:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/url/shorten`
   - Body → Raw → JSON:
     ```json
     { "url": "https://www.google.com" }
     ```
   - Click **Send** → You'll get the shortened URL response.
3. **Test Redirect:**
   - Method: `GET`
   - URL: `http://localhost:5000/<shortCode>` (use the code from step 2)
   - In Postman Settings, **disable "Automatically follow redirects"** to see the 302 response.
   - Or paste the short URL in a browser to be redirected.
4. **Test Duplicate:**
   - Send the same POST request again → Should return the same short code.
5. **Test Invalid URL:**
   - Body: `{ "url": "not-a-url" }` → Should return 400 error.
6. **Test Not Found:**
   - `GET http://localhost:5000/doesnotexist` → Should return 404.

---

## 📸 Screenshots

> _Add screenshots of your Postman requests and responses here._

---

## 🚀 Commands Reference

```bash
# Install all dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

---

## 📂 GitHub Repository Structure

```
url-shortener/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── README.md
├── config/
│   └── db.js
├── controllers/
│   └── urlController.js
├── middleware/
│   └── errorMiddleware.js
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
└── utils/
```

> **Note:** Add a `.gitignore` file to exclude `node_modules/` and `.env` from version control.

---

## 🎤 Common Interview Questions & Answers

### Q1: What does this project do?
**A:** This project is a URL Shortener REST API. It takes a long URL, generates a unique short code using nanoid, stores the mapping in MongoDB, and allows users to redirect to the original URL using the short code.

### Q2: Why did you use nanoid instead of UUID?
**A:** nanoid generates shorter, URL-friendly, unique strings which are ideal for short codes. It's faster and produces more compact IDs than UUID, making it perfect for URL shortening.

### Q3: How do you handle duplicate URLs?
**A:** Before creating a new short URL, the controller checks if the original URL already exists in the database. If it does, it returns the existing short code instead of creating a duplicate entry.

### Q4: How does the redirect work?
**A:** When a GET request comes to `/:shortCode`, the server looks up the short code in MongoDB. If found, it sends a 302 (temporary redirect) response to the browser with the original URL. The browser then navigates to that URL.

### Q5: Why did you choose MongoDB over SQL databases?
**A:** MongoDB is a good fit because the URL data is simple and doesn't require complex relationships. It offers flexible schema design, fast lookups, and scales well horizontally — all of which are ideal for a URL shortener service.

### Q6: How do you validate URLs?
**A:** I use the `validator` npm package, specifically the `isURL()` function with `require_protocol: true` to ensure the URL includes `http://` or `https://`.

### Q7: What is centralized error handling?
**A:** Instead of handling errors in every route, I use a centralized error handling middleware that catches all errors and sends a consistent JSON error response. This keeps the code clean and DRY (Don't Repeat Yourself).

### Q8: What are the HTTP status codes you used?
**A:**
- `201` — Created (new short URL)
- `200` — OK (returning existing short URL)
- `302` — Redirect (navigating to original URL)
- `400` — Bad Request (invalid input)
- `404` — Not Found (short code doesn't exist)
- `500` — Internal Server Error (unexpected errors)

### Q9: How would you deploy this to production?
**A:** I would use a cloud service like Heroku, Render, or AWS. I'd use MongoDB Atlas for the database, set environment variables on the platform, and ensure CORS is configured for the frontend domain.

### Q10: How would you improve this project?
**A:** I would add click tracking and analytics, rate limiting to prevent abuse, user authentication for managing URLs, custom short codes, URL expiration, and a frontend dashboard.

---

## 🎬 How to Explain This Project in a 2-Minute Internship Video

> **Script Template:**

"Hi, I'm [Your Name], and this is my URL Shortener project built during my CodeAlpha Backend Development Internship.

**What it does:** This is a REST API that takes any long URL and converts it into a short, shareable link. When someone visits that short link, they're automatically redirected to the original URL.

**Tech Stack:** I built it using Node.js and Express.js for the backend, MongoDB with Mongoose for the database, and nanoid for generating unique short codes.

**Key Features:**
- URL validation to ensure only valid URLs are shortened
- Duplicate detection — if a URL was already shortened, it returns the existing code
- Centralized error handling for clean, consistent error responses

**How it works:** When a POST request is sent with a URL, the server validates it, checks for duplicates, generates an 8-character unique code using nanoid, stores the mapping in MongoDB, and returns the short URL. When someone visits the short URL, the server looks up the code and redirects them.

**What I learned:** Through this project, I gained hands-on experience with RESTful API design, MongoDB schema modeling, Express middleware patterns, input validation, and error handling best practices.

Thank you for watching!"

---

## 📜 License

This project is licensed under the MIT License.
