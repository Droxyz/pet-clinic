import React, { useState } from "react";
import ownerImage from "../images/owner.png";
import visitImage from "../images/visit.png";
import pawImage from "../images/pawprint.png";
import "react-datepicker/dist/react-datepicker.css";

export function getOwnerCount({ pets }) {
  let owners = [];
  pets.map((pet, index) => {
    if (!owners.includes(pet.ownerId)) owners.push(pet.ownerId);
  });

  return owners.length;
}

export async function getPetDetails(id) {
  try {
    const response = await fetch("http://localhost:4000/pets/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"), // If you're using token-based auth
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData; // Return the fetched data
  } catch (error) {
    console.error("There was an error fetching pet details:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

export async function putPet(pet) {
  try {
    const response = await fetch("http://localhost:4000/pets/" + pet.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"), // If you're using token-based auth
      },
      body: JSON.stringify({
        status: pet.status,
        comment: pet.doctorsComment,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return true;
  } catch (error) {
    console.error("There was an error updating the pet status:", error);
  }
}

export const InfoCards = ({
  ownersCount,
  futureVisits,
  totalVisits,
  petsCount,
}) => {
  return (
    <div className="info-cards-container">
      <div className="info-card bg-primary">
        <img src={ownerImage} alt="owner" id="info-card-image"></img>
        <div>
          <h3>{ownersCount}</h3>
          <p>Reg. Owners</p>
        </div>
      </div>
      <div className="info-card bg-secondary">
        <img src={visitImage} alt="owner" id="info-card-image"></img>
        <div>
          <h3>{futureVisits}</h3>
          <p>Visits / {totalVisits}</p>
        </div>
      </div>
      <div className="info-card bg-danger">
        <img src={pawImage} alt="owner" id="info-card-image"></img>
        <div>
          <h3>{petsCount}</h3>
          <p>Reg. Pets</p>
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </div>
  );
};
