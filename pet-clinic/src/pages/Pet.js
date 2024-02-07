import { Navigate, useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import CatImg from "../images/cat.png";
import DogImg from "../images/dog.png";
import PawImg from "../images/pawprint.png";
import DatePicker from "react-datepicker";
import { faker } from "@faker-js/faker";
import { FaPlus } from "react-icons/fa";

export default function Pet() {
  const navigate = useNavigate();
  const { outletPet } = useOutletContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const [randomText, setRandomText] = useState(null);
  const [pet, setPet] = useState({
    name: "NOT FOUND",
    state: "missing",
    nextVisit: new Date(),
    petType: "ERROR",
    ownerId: -1,
    doctorsComment: "",
    error: true,
  });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  useEffect(() => {
    if (outletPet) {
      setPet(outletPet);
      setRandomText(
        `${outletPet.name} is a ${faker.word.adjective()} ${
          outletPet.petType
        }. ${Math.random() < 0.5 ? "He" : "She"} follows the teachings of ${
          firstName + " " + lastName
        }, more commonly known as ${faker.internet.userName({
          firstName: firstName,
          lastName: lastName,
        })}. ${firstName} once said that "${faker.lorem.sentence()}". ${faker.lorem.sentences(
          5
        )}`
      );
    }
  }, [outletPet]);

  function calcDaysText(nextVisit) {
    const todayDate = new Date();

    if (nextVisit) {
      const diffTime = nextVisit - todayDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      let s = "s";

      if (diffDays === 1 || diffDays === -1) s = "";

      if (diffDays < 0) {
        return `Previous visit was ${Math.abs(diffDays)} day${s} ago`;
      } else {
        return `Next visit is in ${diffDays} day${s}`;
      }
    } else {
      return "Make a new visit";
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  function getImgSrc(pet) {
    if (pet && pet.petType === "dog") {
      return DogImg;
    } else if (pet && pet.petType === "cat") {
      return CatImg;
    } else {
      return PawImg;
    }
  }

  return (
    <div className={`pet-card ${pet ? pet.status : "other"} gap-3 row`} style={{minHeight: 380}}>
      {pet.error && (
        <div className="plus-sign-overlay gap-3 cursor-pointer" onClick={() => navigate("../new")}>
          <FaPlus className="plus-sign bg-white" style={{color: "black"}}/>
          <h1 className="bg-white">Create a new pet</h1>
        </div>
      )}
      <>
        <div className="d-flex flex-column gap-2 p-3 col-md-4 align-items-center ">
          <div
            className="img-wrapper"
            style={{
              border: "1px solid black",
              borderRadius: "50%",
              maxWidth: "200px",
              height: "200px",
              padding: "1.4rem",
            }}
          >
            <img
              src={getImgSrc(pet)}
              alt="Pet"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <h1>
            <input
              placeholder="Type pets name here..."
              type="text"
              name="name"
              className="form-control text-center"
              style={{ fontSize: 25 }}
              value={pet && pet.name}
              onChange={handleInputChange}
            />
          </h1>
        </div>

        {pet && (
          <div className="d-flex flex-column col-md-7">
            <input
              placeholder='PET TYPE Example "dog"...'
              type="text"
              name="petType"
              className="form-control"
              value={pet.petType}
              onChange={handleInputChange}
            />

            <div className="d-flex flex-column gap-1 mt-3">
              {calcDaysText(pet.nextVisit)}
              <DatePicker
                className="m-1 p-1"
                selected={pet.nextVisit}
                onChange={(date) => {
                  setPet({ ...pet, nextVisit: date }); // Update local state
                }}
                placeholderText="Pick a date..."
                shouldCloseOnSelect={false}
              />
            </div>

            <div className="loremimpsum">
              <h2>Description:</h2>
              <p>{randomText}</p>
            </div>

            {isAdmin && (
              <>
                <select
                  id={pet.id}
                  name="status"
                  value={pet.status}
                  onChange={handleInputChange}
                >
                  <option value="alive">alive</option>
                  <option value="deceased">deceased</option>
                  <option value="missing">missing</option>
                  <option value="other">other</option>
                </select>
                <div className="d-flex mt-4 flex-column">
                  <p className="pet-unique-id">Notes:</p>

                  <textarea
                    name="doctorsComment"
                    onInput={handleInputChange}
                    className="form-control p-0 flex-shrink"
                    rows={5} // Adjust the number of rows as needed
                    value={pet.doctorsComment}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </>
    </div>
  );
}
