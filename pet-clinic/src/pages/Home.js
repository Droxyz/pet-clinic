import { InfoCards, getOwnerCount } from "../components/petFunctions";
import AllPets from "../components/AllPets";
import { usePets } from "./DashBoard";
import PetList from "../components/PetList";

export default function Home() {

  const { pets, updatePet } = usePets();

  return (
    <>
      <InfoCards
        ownersCount={getOwnerCount({ pets })}
        futureVisits={2}
        totalVisits={2}
        petsCount={pets.length}
      />
      <AllPets pets={pets} updatePet={updatePet}/>
    </>
  );
}
