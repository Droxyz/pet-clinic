import React from "react";
import doctorImage from "../images/doctor.png";
import ownerImage from "../images/owner.png";
import pawprint2 from "../images/pawprint2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import {
  FaSignOutAlt,
  FaHome,
  FaPaw,
  FaSortDown,
  FaCalendar,
} from "react-icons/fa";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";

export default function NavPanel() {
  const userEmail = localStorage.getItem("userEmail") || null;
  let imageUrl;
  let userText;
  const navigate = useNavigate();

  if (!userEmail) {
    alert("Please don't mess with the localstorage");
    localStorage.clear();
    navigate("/login");
  }

  if (userEmail.split("@")[0] === "doctor") {
    imageUrl = doctorImage;
  } else {
    imageUrl = ownerImage;
  }
  userText = userEmail.split("@")[0];

  return (
    <div
      className="d-flex text-center align-items-center justify-content-between flex-md-column"
      id="nav-top"
    >
      <div className="">
        <h4
          className="cursor-pointer d-none d-md-block mb-md-5"
          style={{
            textShadow: "black 4px 4px 4px",
            textDecoration: "underline 2px green",
          }}
          onClick={() => navigate("/")}
        >
          Pet Clinic
        </h4>
        <img src={imageUrl} alt="profile-picture" id="profile-img" />
        <div className="username">
          <h3 className="">{userText}</h3>
          <div className="d-none d-md-block">@{userEmail.split("@")[1]}</div>
        </div>
      </div>

      <ul
        className="dropdown nav d-none d-sm-flex flex-row flex-md-column mt-0 mt-md-5 gap-5 w-md-100"
        id="nav-links"
      >
        <li className="nav-item">
          <NavLink className="nav-link d-flex gap-3" to="/">
            <FaHome /> Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link d-flex gap-3" to="/pets">
            <FaPaw /> Pet Info
          </NavLink>
        </li>
        <li className="nav-item" >
          <NavLink className="nav-link d-flex gap-3" to="/visit">
            <FaCalendar /> Calendar
          </NavLink>
        </li>
        <a
          className=" d-flex align-items-center p-2 gap-2"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          id="log-out"
        >
          <FaSignOutAlt />
          <p className="d-none d-md-flex m-0">Log out</p>
        </a>
      </ul>
      <div className="d-sm-none bg-dark d-flex gap-3">
        <div className="dropdown d-flex flex-column align-items-center p-3">
          <FaPaw size={25} />
          <div className="dropdown top-50 position-absolute">
            <FaSortDown size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}
