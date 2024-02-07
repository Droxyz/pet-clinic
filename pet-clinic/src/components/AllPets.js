import { FaSearch, FaPen, FaToggleOn, FaToggleOff } from "react-icons/fa"; // Importing the search icon
import { React, useEffect, useState } from "react";
import CatImg from "../images/cat.png";
import DogImg from "../images/dogg.png";
import { usePets } from "../pages/DashBoard";

// LOGIC: whenever backend is called, we update original pets.

export default function AllPets({ pets, updatePet }) {
  const [filteredPets, setFilteredPets] = useState(pets);
  const { isAdmin } = usePets();
  const [editingPet, setEditingPet] = useState(null);
  const [filters, setFilters] = useState({
    isMinimal: false,
    onlyAlive: false, // active, inactive
    nextVisit: null, // date
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Mounting sets up event listener. Unmounting removes event listener.
  // Additionally dependency change runs return statement before running useEffect again.
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter" && editingPet) {
        handleSave(editingPet);
        setEditingPet(null);
        event.preventDefault(); // Prevent the default behavior of the Enter key (e.g., form submission)
      }
    }
    const handleClick = (event) => {
      if (!event.target.closest(".pet-card")) {
        // pass in dummy, function will still check if there are changes made in editingpet
        // Note that checkChanges runs this useEffect once. Inside checkChanges we setEditingPet(dummy).
        checkChanges(
          editingPet,
          { name: "dummy", status: "dummy", id: -1 },
          filteredPets
        );
        setEditingPet(null);
      }
    };
    document.addEventListener("keypress", handleKeyPress);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
      document.removeEventListener("click", handleClick);
    };
  }, [editingPet]);

  // If you are "editing", and have unsaved changes, ask to save. Otherwise, update editingPet
  const checkChanges = (editingPet, chosenPet, filteredPets) => {
    if (editingPet && editingPet.id !== chosenPet.id) {
      const originalPet = filteredPets.find((pet) => pet.id === editingPet.id);
      if (
        originalPet &&
        JSON.stringify(originalPet) !== JSON.stringify(editingPet)
      ) {
        if (window.confirm("Do you want to save changes to the current pet?")) {
          handleSave(editingPet);
        } else {
          chosenPet = null;
        }
      }

      setEditingPet(chosenPet);
    }
  };

  // update pets and put request to backend
  const handleSave = async (pet) => {
    setFilteredPets((prevPets) =>
      prevPets.map((p) => (p.id === pet.id ? pet : p))
    );

    const success = await updatePet(pet);

    if (!success) {
      alert("Something went wrong :(, check console for logs");
    }
  };

  const handlePetChange = (pet, event) => {
    if (event) {
      event.stopPropagation(); // Prevent event from propagating to parent elements
    }
    setFilters((prevFilters) => ({ ...prevFilters, isMinimal: false }));

    checkChanges(editingPet, pet, filteredPets);

    if (!editingPet || editingPet.id !== pet.id) {
      setEditingPet(pet);
    }
  };

  const handleStatusChange = (e, pet) => {
    const newStatus = e.target.value;
    setEditingPet({ ...pet, status: newStatus });
  };

  function applyFilters() {
    let filteredResults;

    if (filters.onlyAlive) {
      filteredResults = pets.filter((pet) => pet.status === "alive");
    } else {
      filteredResults = pets;
    }

    setFilteredPets(filteredResults);
  }

  const handleNotesChange = (e, petToUpdate) => {
    const newValue = e.target.value;
    setEditingPet((prevEditingPet) => {
      if (prevEditingPet && prevEditingPet.id === petToUpdate.id) {
        return {
          ...prevEditingPet,
          doctorsComment: newValue,
        };
      }
      return prevEditingPet;
    });
  };

  // Function returns correct classname based on status and if edit active
  function petCardClassName(pet, editingPet) {
    let returnValue = "pet-card ";

    if (pet && pet.status) {
      returnValue += pet.status + " ";
    }

    if (isEditing(pet, editingPet)) {
      returnValue += "edit-active";
    } else if (editingPet) {
      returnValue += "faded";
    }

    return returnValue;
  }

  function isEditing(pet, editingPet) {
    if (editingPet && pet && editingPet.id === pet.id) {
      return true;
    } else {
      return false;
    }
  }

  const filterPets = (input) => {
    const searchText = input.target.value.toLowerCase();

    const filteredResults = pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(searchText) || // Check if pet name contains the search text
        pet.id.toString().includes(searchText) || // Check if pet ID contains the search text
        pet.petType.toString() === searchText
    );

    setFilteredPets(filteredResults); // Update the filtered pets
  };

  // JSX RETURN ()
  return (
    <>
      <h1>List of pets</h1>

      <div className="d-flex flex-column flex-sm-row gap-3 p-3">
        <div className="d-flex gap-2 align-items-center">
          <input
            type="text"
            className="form-control p-1"
            style={{
              border: "none",
              outline: "none",
              borderBottom: "1px solid green",
              borderRadius: 0,
            }}
            placeholder="Search here..."
            onInput={filterPets}
          />

          <div className="input-group-append">
            <span className="">
              <FaSearch />
            </span>
          </div>
        </div>
        <div className="d-flex gap-3 ">
          <button
            onClick={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                isMinimal: !prevFilters.isMinimal,
              }))
            }
            className={`btn d-flex align-items-center gap-3 ${
              filters.isMinimal ? "btn-success" : "btn-danger"
            }`}
          >
            <p className="m-0">Minimal</p>
            {filters.isMinimal ? <FaToggleOn /> : <FaToggleOff />}
          </button>
          <button
            onClick={() =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                onlyAlive: !prevFilters.onlyAlive,
              }))
            }
            className={`btn d-flex align-items-center gap-3 ${
              filters.onlyAlive ? "btn-success" : "btn-danger"
            }`}
          >
            <p className="m-0">Filter: "alive"</p>
            {filters.onlyAlive ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>
      </div>

      <div className="pets-list">
        {Object.values(filteredPets).map((pet, index) => (
          <div
            key={index}
            className={petCardClassName(pet, editingPet)}
            onClick={() => editingPet && handlePetChange(pet)}
          >
            {pet.petType === "cat" && (
              <img src={CatImg} className="card-img cat" alt="cat-image"></img>
            )}

            {pet.petType === "dog" && (
              <img src={DogImg} className="card-img dog" alt="dog-image"></img>
            )}

            <div className="d-flex justify-content-between">
              <h3 className="pet-name">{pet.name}</h3>

              {isAdmin && (
                <div style={{ marginLeft: 10 }}>
                  {editingPet && editingPet.id === pet.id ? (
                    <></>
                  ) : (
                    <FaPen onClick={(e) => handlePetChange(pet, e)} />
                  )}
                </div>
              )}
            </div>

            <p className="pet-text">
              {filters.isMinimal ? pet.petType + ", ID: " + pet.id : ""}
              {!filters.isMinimal ? "Type: " + pet.petType : ""}
            </p>
            <p className="pet-text">
              {!filters.isMinimal ? "Pet ID: " + pet.id : ""}
            </p>

            {!filters.isMinimal && (
              <>
                {isAdmin && <p className="pet-text">Owner ID: {pet.ownerId}</p>}
                <p className="pet-text">Next visit: {pet.date}</p>
                <p className="pet-text">Date of Birth: {pet.dob}</p>
                <div className="d-flex gap-3">
                  <select
                    id={pet.id}
                    disabled={!isAdmin}
                    value={
                      isEditing(pet, editingPet)
                        ? editingPet.status
                        : pet.status
                    }
                    onChange={(e) => handleStatusChange(e, pet)}
                  >
                    <option value="alive">alive</option>
                    <option value="deceased">deceased</option>
                    <option value="missing">missing</option>
                    <option value="other">other</option>
                  </select>
                </div>

                {isAdmin && (
                  <div className="d-flex mt-4 flex-column">
                    <p className="pet-text">Notes:</p>

                    <textarea
                      onInput={(e) => handleNotesChange(e, pet)}
                      disabled={!editingPet || pet.id !== editingPet.id}
                      className="form-control p-0 flex-shrink"
                      rows={5} // Adjust the number of rows as needed
                      value={
                        isEditing(pet, editingPet)
                          ? editingPet.doctorsComment
                          : pet.doctorsComment
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
