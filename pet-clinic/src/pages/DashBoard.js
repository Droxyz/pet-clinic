import React, { useContext, createContext, useState, useEffect } from "react";
import MainView from "./MainView";
import NavPanel from "./NavPanel";

const PetContext = createContext();

export const usePets = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  async function fetchPets() {
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
      console.log(data);
    } catch (error) {
      console.error("There was an error fetching the pets", error);
    }
  }

  const value = {
    pets,
    addPet: (newPet) => setPets((prevPets) => [...prevPets, newPet]),
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

export default function DashBoard() {
  return (
    <PetProvider>
      <div className="container-fluid row vh-md-100 p-0 m-0">
        <div className="col-md-2 overflow-auto bg-dark text-white">
          <NavPanel />
        </div>
        <div className="col-md-10 mt-2 overflow-auto">
          <MainView />
        </div>
      </div>
    </PetProvider>
  );
}
