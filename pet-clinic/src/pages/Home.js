import { usePets } from "./DashBoard";
import { InfoCards, getOwnerCount } from "../components/petFunctions";
import AllPets from "../components/AllPets";

export default function MainView() {
  const { pets } = usePets();

  return (
    <>
      <InfoCards
        ownersCount={getOwnerCount({ pets })}
        futureVisits={2}
        totalVisits={2}
        petsCount={pets.length}
      />
      <AllPets pets={pets}/>
    </>
  );
}
