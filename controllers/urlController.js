const { nanoid } = require('nanoid');
const validator = require('validator');
const Url = require('../models/Url');

/**
 * @desc    Shorten a URL
 * @route   POST /api/url/shorten
 * @access  Public
 *
 * Accepts a long URL in the request body, validates it,
 * checks for duplicates, generates a unique short code,
 * saves to database, and returns the shortened URL.
 */
const shortenUrl = async (req, res, next) => {
    try {
        const { url } = req.body;

        // --- Validation ---
        // Check if URL is provided
        if (!url) {
            res.status(400);
            throw new Error('Please provide a URL');
        }

        // Validate URL format using the validator library
        if (!validator.isURL(url, { require_protocol: true })) {
            res.status(400);
            throw new Error('Please provide a valid URL (include http:// or https://)');
        }

        // --- Duplicate Check ---
        // If this URL was already shortened, return the existing record
        const existingUrl = await Url.findOne({ originalUrl: url });

        if (existingUrl) {
            return res.status(200).json({
                originalUrl: existingUrl.originalUrl,
                shortCode: existingUrl.shortCode,
                shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`,
            });
        }

        // --- Generate Short Code ---
        // nanoid generates a unique, URL-friendly string (8 characters)
        const shortCode = nanoid(8);

        // --- Save to Database ---
        const newUrl = await Url.create({
            originalUrl: url,
            shortCode,
        });

        // --- Send Response ---
        res.status(201).json({
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode,
            shortUrl: `${process.env.BASE_URL}/${newUrl.shortCode}`,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Redirect to the original URL using the short code
 * @route   GET /:shortCode
 * @access  Public
 *
 * Looks up the short code in the database.
 * If found, redirects the user to the original URL.
 * If not found, returns a 404 error.
 */
const redirectUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        // Find the URL document by its short code
        const url = await Url.findOne({ shortCode });

        if (url) {
            // Redirect to the original URL (HTTP 302 - temporary redirect)
            return res.redirect(url.originalUrl);
        }

        // Short code not found in database
        res.status(404);
        throw new Error('URL not found');
    } catch (error) {
        next(error);
    }
};

module.exports = { shortenUrl, redirectUrl };
