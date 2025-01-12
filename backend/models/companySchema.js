const mongoose = require('mongoose');

// Embedded Review Schema
const reviewSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now }
});

// Company Schema with embedded reviews
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    foundedOn: { type: Date },
    city: { type: String },
    logo: { type: String },
    description: { type: String },
    reviews: [reviewSchema] // Embedded reviews
});

module.exports = mongoose.model('Company', companySchema);
