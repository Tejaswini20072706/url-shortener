const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

/**
 * @route   POST /api/url/shorten
 * @desc    Create a shortened URL
 */
router.post('/shorten', shortenUrl);

/**
 * @route   GET /:shortCode
 * @desc    Redirect to the original URL using the short code
 */
router.get('/:shortCode', redirectUrl);

module.exports = router;
