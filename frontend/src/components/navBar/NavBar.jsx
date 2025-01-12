import React from "react";
import './navBar.css'

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navBarContainer">
        <div className="container-fluid py-2">
          {/* <a className=" navbar-brand" href="#"> */}
          <div className="d-flex align-items-center navLogo ms-lg-5">
          <i className="fa-solid fa-star"></i>
            <h3 className="d-flex align-items-center ms-3 mb-0">Review <h2 className="mb-0">&</h2><span>Rate</span></h3>
          </div>
          {/* </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex me-auto ml-0"></div>
            <div className="d-flex  mr-0">
            <form className="d-flex form-field" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input><i className="fa-solid fa-magnifying-glass icon"></i>
              </form>
            </div>
           
            <div className="d-flex  mr-0">

              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active">
                    SignUp
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
