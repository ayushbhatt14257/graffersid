import React, { useEffect, useState } from "react";
import { fetchCompanies } from "../../service/api";
import { Link } from "react-router-dom";
import "./companyList.css";
import IMG from "../../assets/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1024x376.jpg";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companies = await fetchCompanies();
        setCompanies(companies);
        setFilteredCompanies(companies); // Initially display all companies
      } catch (error) {
        console.error(error);
      }
    };
    loadCompanies();
  }, []);

  const handleSearchChange = (event) => {
    const keyword = event.target.value;
    setSearchLocation(keyword);

    if (keyword.trim() === "") {
      // If search field is cleared, display all companies
      setFilteredCompanies(companies);
    } else {
      // Filter companies based on location keyword
      const filtered = companies.filter((company) =>
        company.location.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  const handleFindCompany = () => {
    if (filteredCompanies.length === 0) {
      alert("No matching company found");
    }
  };

  return (
    <div className="container">
      <div className="homeTopFilter">
        <div className="homeTopFilterLeftContainer">
          <div className="homeLeftFilterInput form-field">
            <label>Select City</label>
            <input
              type="text"
              placeholder="Eg:- Indore, Madhya Pradesh, India"
              value={searchLocation}
              onChange={handleSearchChange}
            />
            <i className="fa-solid fa-location-dot icons"></i>
          </div>
          <div className="homeleftbutton">
            <button onClick={handleFindCompany}>Find Company</button>
          </div>
        </div>
        <div className="homeTopFilterRightContainer">
          <div className="homeRightButton">
            <button>
              <Link to="/add-company" className="no-underline">+ Add Company</Link>
            </button>
          </div>

          <div className="homeRightFilterInput">
            <label htmlFor="">Sort</label>
            <select name="" id="">
              <option value="">Name</option>
              <option value="">Location</option>
            </select>
          </div>
        </div>
      </div>
      <hr />

      <div className="comapnyDetailsContainer">
        <p>Result Found: {filteredCompanies.length}</p>
        <ul className="companyDetailsUl">
          {filteredCompanies.map((company) => {
            // Calculate average rating and total reviews
            const totalReviews = company.reviews.length;
            const averageRating = totalReviews
              ? company.reviews.reduce(
                  (sum, review) => sum + review.rating,
                  0
                ) / totalReviews
              : 0;

            // Generate star icons based on averageRating
            const fullStars = Math.floor(averageRating);
            const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;

            return (
              <li key={company._id} className="companyDetailsLi">
                <div className="companyListContainer">
                  <div className="companyListImgAndDetails">
                    <div className="companyListImg">
                      <img src={IMG} alt={company.name} />
                    </div>

                    <div className="companyListDetail">
                      <div className="nameAndLocation">
                        <h3>{company.name}</h3>
                        <p>
                          <i className="fa-solid fa-location-dot"></i>
                          {company.location}
                        </p>
                      </div>
                      <div className="review">
                        <div className="ratingContainer">
                          <h3>{averageRating.toFixed(1)}</h3>
                          {[...Array(fullStars)].map((_, i) => (
                            <i
                              key={`full-${i}`}
                              className="fa-solid fa-star"
                              style={{ color: "gold" }}
                            ></i>
                          ))}
                          {halfStar === 1 && (
                            <i
                              className="fa-solid fa-star-half-stroke"
                              style={{ color: "gold" }}
                            ></i>
                          )}
                          {[...Array(emptyStars)].map((_, i) => (
                            <i
                              key={`empty-${i}`}
                              className="fa-regular fa-star"
                              style={{ color: "gray" }}
                            ></i>
                          ))}
                        </div>
                        <p>{totalReviews} reviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="companyListReview">
                    <div className="foundDate">
                      <p>
                        Founded On{" "}
                        {new Date(company.foundedOn).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="reviewDetailBtn">
                      <button>
                        <Link className="no-underline" to={`/company/${company._id}`}>
                          Detail Review
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CompanyList;
