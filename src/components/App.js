import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleFilterChange(event) {
    setFilters({ type: event.target.value })
  }

  let petData = [];
  useEffect(() => {
    if (filters.type === "all") {
      fetch("http://localhost:3001/pets")
        .then(res => res.json())
        .then(data => {petData = data});
    }
    else {
      fetch(`http://localhost:3001/pets?type=${filters.type}`)
        .then(res => res.json())
        .then(data => {petData = data})
    }
  }, [filters])

  function handleFilterClick() {
    setPets(petData);
  }

  function onAdoptPet(id) {
    setPets((pets) => pets.map((pet) => {
      if(pet.id===id) return {...pet, isAdopted: true}
      return pet
    }));
  } 

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleFilterChange}
              onFindPetsClick={handleFilterClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser 
              pets={pets}
              onAdoptPet={onAdoptPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
