const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const { redirectUrl } = require('./controllers/urlController');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express application
const app = express();

// ---------- Middleware ----------

// Enable Cross-Origin Resource Sharing for all origins
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// ---------- Routes ----------

// URL shortening API routes (POST /api/url/shorten)
app.use('/api/url', urlRoutes);

// Redirect route — handles GET /:shortCode at root level
// Must come after API routes to avoid conflicts
app.get('/:shortCode', redirectUrl);
app.get("/", (req, res) => {
  res.send("URL Shortener API is running 🚀");
});

// ---------- Error Handling ----------

// Handle 404 — route not found
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

// ---------- Start Server ----------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`🔗 Base URL: ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});
