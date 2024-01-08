import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavPanel from "./NavPanel";
import NotFoundPage from "../pages/NotFoundPage";
import { putPet } from "../components/petFunctions";

const PetContext = createContext();

export const usePets = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/pets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPets(data); // Update the state directly with the fetched data
        console.log({message: "Pets successfully Fetched", data});
      } catch (error) {
        console.error("There was an error fetching the pets", error);
      }


    }/*
    async function fetchData() {
      try {
        const response = await fetch("/1000pets.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPets(data); // Update the state directly with the fetched data
        console.log({ message: "Pets successfully Fetched", data });
        console.log(JSON.stringify(data));
      } catch (error) {
        console.error("There was an error fetching the pets", error);
      }
    }*/

    fetchData(); // Call the fetchData function to fetch and update pets

  }, []);

  async function updatePet(updatedPet) {
    try {
      await putPet(updatedPet);

      setPets((prevPets) =>
        prevPets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );

      return true;
    } catch (e) {
      return false;
    }
  }

  const value = {
    pets,
    updatePet,
    addPet: (newPet) => setPets((prevPets) => [...prevPets, newPet]),
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

export default function DashBoard() {
  return (
    <PetProvider>
      <div className="container-fluid row vh-md-100 p-0 m-0">
        <div className="col-md-2 overflow-auto bg-dark text-white position-sticky top-0">
          <NavPanel />
        </div>
        <div className="col-md-10 mt-2 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<></>} />
            <Route path="/pets/:id" element={<></>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </PetProvider>
  );
}
