import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import PetList from "./PetList";
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePets } from "../pages/DashBoard";

export default function PetLayout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { pets, isAdmin } = usePets();
  const [direction, setDirection] = useState("top-to-bottom");
  const [petNumber, setPetNumber] = useState(parseInt(id, 10) || 0);
  const [inputValue, setInputValue] = useState(id || "");

  const pet = useMemo(() => {
    if (isAdmin) {
      return pets.find((p) => p.id === petNumber); 
    } else {
      return pets[petNumber-1]; 
    }
  }, [petNumber, pets, isAdmin]);

  useEffect(() => {
    const numId = parseInt(id, 10);
    if (!isNaN(numId)) {
      setPetNumber(numId);
      setInputValue(numId.toString());
    }
  }, [id]);

  const handlePetNumberChange = (value, direction) => {
    if (value < 1) value = pets.length;
    if (value > pets.length) {
      value = pets.length;
      if (direction === "right") value = 1;
    }

    setDirection(direction);
    setPetNumber(value);
    setInputValue(value.toString());
    navigate(`/pets/${value}`, { replace: true });
  };

  return (
    <>
      <div className="top-to-bottom-animation">
        <div className="links d-flex text-center">
          <button onClick={() => handlePetNumberChange(petNumber - 1, "left")}>
            <FaArrowLeft />
          </button>

          <input
            type="number"
            className="form-control petlayout"
            value={inputValue}
            onChange={(e) => {
              const newValue = e.target.value;
              console.log(newValue !== "" && newValue !== inputValue)
              if (newValue !== "" && newValue !== inputValue) {
                newValue <= 0
                  ? handlePetNumberChange(1, "top-to-bottom")
                  : handlePetNumberChange(Number(newValue), "top-to-bottom");
              }
              setInputValue(newValue); // Update inputValue state
            }}
          />

          <button
            onClick={() =>
              handlePetNumberChange(Number(petNumber) + 1, "right")
            }
          >
            <FaArrowRight />
          </button>

        <Link to={"/pets/new"}>Create a new pet?</Link>

        </div>


        <div className={`outlet ${direction}-animation`}>
          <Outlet context={{ outletPet: pet }} />
        </div>

        <div className="pet-list">
          <PetList />
        </div>
      </div>
    </>
  );
}
