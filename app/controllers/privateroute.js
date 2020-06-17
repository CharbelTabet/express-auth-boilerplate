// CALL packages
const router = require('express').Router();
const verify = require('./config/verifytoken.js');

// ROUTES
router.get('/', verify, (req, res) => {
    res.json({message: 'welcome authenticated user!'})
})

// EXPORTS
module.exports = router
