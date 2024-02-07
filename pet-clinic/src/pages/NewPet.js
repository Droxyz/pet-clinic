import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePets } from "./DashBoard";

const NewPet = () => {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState({
    name: "",
    type: "",
    ownerId: "",
    dob: new Date(),
  });
  const { refreshPets } = usePets();

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4000/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(pet),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      refreshPets();
      const data = await response.json();
      setLoading(false);
      navigate(`/pets/${data.pet.id}`);
    } catch (error) {
      setLoading(false);
      console.error("There was an error appending pet: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Pet Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={pet.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Pet Type
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          name="petType"
          value={pet.petType}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dob" className="form-label">
          Date of birth
        </label>
        <DatePicker
          className="m-1 p-1"
          selected={pet.dob}
          onChange={(date) => {
            setPet({ ...pet, dob: date }); // Update local state
          }}
          placeholderText="Pick a date..."
          shouldCloseOnSelect={false}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ownerId" className="form-label">
          Owner ID
        </label>
        <input
          type="number"
          className="form-control"
          id="ownerId"
          name="ownerId"
          value={pet.ownerId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Pet
      </button>
    </form>
  );
};

export default NewPet;
