const express = require('express');
const Company = require('../models/companySchema');
const router = express.Router();

// List all companies
router.get('/getCompanyList', async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add a new company
router.post('/companies', async (req, res) => {
    const { name, location, foundedOn, city, logo, description } = req.body;
    try {
        const newCompany = new Company({ name, location, foundedOn, city, logo, description });
        const savedCompany = await newCompany.save();
        res.status(201).json({ message: 'Company added successfully', company: savedCompany });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// List all reviews for a specific company
router.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });

        res.status(200).json(company);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Add a review to a specific company
router.post('/companies/:id/reviews', async (req, res) => {
    const { fullName, subject, reviewText, rating } = req.body;
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });

        const newReview = { fullName, subject, reviewText, rating };
        company.reviews.push(newReview); // Add review to the company's reviews array
        await company.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// List all reviews for a specific company
router.get('/companies/:id/reviews', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });

        res.status(200).json(company.reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
