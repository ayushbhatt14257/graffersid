import React, { useEffect, useState } from "react";
import { fetchCompanyDetails } from "../../service/api";
import { useParams, Link } from "react-router-dom";
import IMG from "../../assets/8867.Microsoft_5F00_Logo_2D00_for_2D00_screen-1024x376.jpg";
import IMG2 from "../../assets/2.webp";
import "./companyDetails.css";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const loadCompanyDetails = async () => {
      const data = await fetchCompanyDetails(id);
      setCompany(data);
    };
    loadCompanyDetails();
  }, [id]);

  if (!company) return <div>Loading...</div>;

  const totalReviews = company.reviews.length;
  const averageRating = totalReviews
    ? company.reviews.reduce((sum, review) => sum + review.rating, 0) /
      totalReviews
    : 0;

  // Generate star icons based on averageRating
  const fullStars = Math.floor(averageRating);
  const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  return (
    <>
      <div className="container">
        <div className="detailsReviewList">
          <div className="companyReviewListContainer">
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
                {/* <p>Founded On {company.foundedOn}</p> */}
                <p>
                  Founded On{" "}
                  {new Date(company.foundedOn).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="reviewDetailBtn">
                <button>
                  {" "}
                  <Link className="no-underline" to={`/company/${company._id}/review`}>
                    + Add Review
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className="reviewList">
            <p>Result Found: {company.reviews.length}</p>
            <ul className="reviewListLengthUl">
              {company.reviews.map((review, index) => (
                <li key={index} className="reviewListLengthLi">
                  <div>
                    <div className="reviewContainer">
                      <div className="reviewLeft">
                        <div className="reviewImg">
                          <img src={IMG2} alt="" />
                        </div>
                        <div className="reviwerName">
                          <h3>{review.fullName}</h3>
                          {/* <p>{review.createdAt}</p> */}
                          <p>
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                            ,{" "}
                            {new Date(review.createdAt).toLocaleTimeString(
                              "en-GB",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="reviewRight">
                        {[...Array(Math.floor(review.rating))].map((_, i) => (
                          <i
                            key={`full-${i}`}
                            className="fa-solid fa-star"
                            style={{ color: "gold" }}
                          ></i>
                        ))}
                        {review.rating % 1 >= 0.5 && (
                          <i
                            className="fa-solid fa-star-half-stroke"
                            style={{ color: "gold" }}
                          ></i>
                        )}
                        {[...Array(5 - Math.ceil(review.rating))].map(
                          (_, i) => (
                            <i
                              key={`empty-${i}`}
                              className="fa-regular fa-star"
                              style={{ color: "gray" }}
                            ></i>
                          )
                        )}
                      </div>
                    </div>
                    <div className="reviewPara">
                      <h4>{review.subject}</h4>
                      <p>{review.reviewText}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
