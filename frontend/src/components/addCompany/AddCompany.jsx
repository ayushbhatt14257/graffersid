import React, { useState } from "react";
import { addCompany } from "../../service/api";
import { useNavigate } from "react-router-dom";
import "./addCompany.css";

const AddCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.foundedOn) newErrors.foundedOn = "Foundation date is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await addCompany(formData);
    navigate("/");
  };

  return (
    <div className="container inputFormMainContainer">
      <div className="inputFormContainer">
        <h1>Add Company</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputDiv">
              <label>Enter Name</label>
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="inputDiv">
              <label>Location</label>
              <input
                name="location"
                placeholder="Location"
                onChange={handleChange}
                value={formData.location}
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>
            <div className="inputDiv">
              <label>Foundation Date</label>
              <input
                name="foundedOn"
                type="date"
                onChange={handleChange}
                value={formData.foundedOn}
              />
              {errors.foundedOn && <p className="error">{errors.foundedOn}</p>}
            </div>
            <div className="inputDiv">
              <label>Enter City</label>
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                value={formData.city}
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>
            <div className="inputDiv">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={formData.description}
              />
              {errors.description && <p className="error">{errors.description}</p>}
            </div>
            <div className="inputBtn">
              <button type="submit">Add Company</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
