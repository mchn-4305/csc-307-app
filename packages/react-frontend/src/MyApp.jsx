// src/MyApp.jsx
import React, { useState} from "react";
import Table from "./Table";



function MyApp() {
  const [characters, setCharacters] = useState([]);  
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated)
  }
  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removerCharacter={removeOneCharacter} 
      />
      <Form />
    </div>
  );
}

export default MyApp;