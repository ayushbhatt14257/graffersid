import React, { useState } from "react";
import { addReview } from "../../service/api";
import { useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.subject) newErrors.subject = "Subject is required.";
    if (!formData.reviewText) newErrors.reviewText = "Review text is required.";
    if (!formData.rating) {
      newErrors.rating = "Rating is required.";
    } else if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await addReview(id, formData);
    navigate(`/company/${id}`);
  };

  return (
    <div className="container inputFormMainContainer">
      <div className="inputFormContainer">
        <h1>Add Review</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label>Enter Name</label>
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.fullName}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>
            <div className="inputDiv">
              <label>Subject</label>
              <input
                name="subject"
                placeholder="Subject"
                onChange={handleChange}
                value={formData.subject}
              />
              {errors.subject && <p className="error">{errors.subject}</p>}
            </div>
            <div className="inputDiv">
              <label>Enter Message</label>
              <textarea
                name="reviewText"
                placeholder="Review"
                onChange={handleChange}
                value={formData.reviewText}
              />
              {errors.reviewText && <p className="error">{errors.reviewText}</p>}
            </div>
            <div className="inputDiv">
              <label>Ratings</label>
              <input
                name="rating"
                type="number"
                placeholder="Rating (1-5)"
                onChange={handleChange}
                value={formData.rating}
              />
              {errors.rating && <p className="error">{errors.rating}</p>}
            </div>

            <div className="inputBtn">
              <button type="submit">Add Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
