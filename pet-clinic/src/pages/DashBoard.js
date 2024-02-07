import React, { useContext, createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavPanel from "./NavPanel";
import NotFoundPage from "../pages/NotFoundPage";
import { getOwnerCount, putPet } from "../components/petFunctions";
import PetLayout from "../components/PetLayout";
import PetList from "../components/PetList";
import Pet from "./Pet";
import NewPet from "./NewPet";

const PetContext = createContext();

export const usePets = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
      console.log({ message: "Pets successfully Fetched", data });
      if (getOwnerCount({ pets: data }) > 1) setIsAdmin(true);
    } catch (error) {
      console.error("There was an error fetching the pets", error);
    }
  }

  function refreshPets() {
    fetchData();
  }


  useEffect(() => {
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
    isAdmin,
    updatePet,
    addPet: (newPet) => setPets((prevPets) => [...prevPets, newPet]),
    refreshPets,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

export default function DashBoard() {
  return (
    <div className="container-fluid row vh-md-100 p-0 m-0">
      <div className="col-md-2 overflow-auto bg-dark text-white position-sticky top-0">
        <NavPanel />
      </div>
      <div className="col-md-10 mt-2 overflow-auto">
        <PetProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetLayout />}>
              <Route path=":id" element={<Pet />} />
              <Route path="new" element={<NewPet />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PetProvider>
      </div>
    </div>
  );
}
