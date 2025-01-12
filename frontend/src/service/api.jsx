import { toast } from "react-toastify";

// const API_BASE = "http://localhost:8000/api";

// Helper function to handle fetch requests
const handleFetch = async (url, options, successMessage) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }
        if (successMessage) {
            toast.success(successMessage);
        }
        return data;
    } catch (error) {
        toast.error(error.message);
        throw error;
    }
};

// Fetch all companies
export const fetchCompanies = async () => {
    try {
        const response = await fetch("/getCompanyList"); // Direct API call
        if (!response.ok) {
            throw new Error("Failed to fetch companies");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
};


// Add a new company
export const addCompany = async (companyData) => {
    return handleFetch(
        `/companies`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(companyData),
        },
        "Company added successfully!"
    );
};

// Fetch company details (with reviews)
export const fetchCompanyDetails = async (companyId) => {
    return handleFetch(`/companies/${companyId}`, { method: "GET" });
};

// Add a review to a company
export const addReview = async (companyId, reviewData) => {
    return handleFetch(
        `/companies/${companyId}/reviews`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData),
        },
        "Review added successfully!"
    );
};
