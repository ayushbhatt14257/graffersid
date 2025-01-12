import React from "react";
import { Route, Routes } from "react-router-dom";
import CompanyList from "./components/companyList/companyList";
import AddCompany from "./components/addCompany/AddCompany";
import CompanyDetails from "./components/companyDetails/CompanyDetails";
import AddReview from "./components/addReview/AddReview";
import NavBar from "./components/navBar/NavBar";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<CompanyList />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
            <Route path="/company/:id/review" element={<AddReview />} />
        </Routes>
);
}

function App() {
    return (
        <>
            <NavBar/>
            <Routing/>
        </>
    )
}

export default App;
