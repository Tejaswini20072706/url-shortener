const mongoose = require('mongoose');

/**
 * Url Schema
 *
 * Defines the structure for storing shortened URLs in MongoDB.
 *
 * Fields:
 * - originalUrl: The full, original URL provided by the user
 * - shortCode:   The unique generated code used in the short URL
 * - createdAt:   Timestamp of when the short URL was created
 */
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: [true, 'Original URL is required'],
    },
    shortCode: {
        type: String,
        required: [true, 'Short code is required'],
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Url', urlSchema);
