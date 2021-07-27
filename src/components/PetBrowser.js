import React from "react";

import Pet from "./Pet";

function PetBrowser({pets, onAdoptPet}) {
  return <div className="ui cards">
    {pets.map((pet) => {
      return (
        <Pet 
          pet={pet}
          onAdoptPet={onAdoptPet}
          key={pet.id}
        />
      )
    })}
  </div>;
}

export default PetBrowser;
