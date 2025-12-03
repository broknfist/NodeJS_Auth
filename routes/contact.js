const express = require('express');
const router = express.Router();

// GET request to display the contact form
router.get('/', (req, res) => {
    // Renders the 'contact' template (e.g., contact.ejs)
    res.render('contact', { 
        title: 'Contact Us',
        message: null // No initial message
    });
});

// POST request to handle form submission
router.post('/', (req, res) => {
    // 1. Get data from the submitted form (using req.body)
    const { name, email, message } = req.body;
    
    // 2. Perform validation (basic example)
    if (!name || !email || !message) {
        return res.render('contact', {
            title: 'Contact Us - Error',
            message: 'Please fill in all fields.',
            error: true
        });
    }

    // 3. Process the data (e.g., send an email, save to a database)
    // NOTE: Sending a real email requires an external library (like Nodemailer)
    
    console.log(`New contact submission from: ${name} <${email}>`);
    console.log(`Message: ${message}`);

    // 4. Respond to the user with a success message
    res.render('contact', {
        title: 'Contact Us - Success',
        message: 'Thank you for your message! We will be in touch shortly.',
        error: false
    });
});

module.exports = router;