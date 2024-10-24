// src/MyApp.jsx
import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);  

  function removeOneCharacter(index) {
    const userDel = characters[index];
    const promise = fetch(`http://localhost:8000/users/${userDel._id}`, {
      method: "DELETE",
    }).then((res) => {
      if ( res.status === 204) {
        const updated = characters.filter((character) => {
          return character._id !== userDel._id;
        })
        setCharacters(updated);
      } else {
        throw new Error("Failure deleting user");
      }
    });
    return promise.catch((error) => console.log(error));
  }

  function updateList(person) {
    postUser(person)
      .then((newUser) => setCharacters([...characters,newUser]))
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setCharacters(json["users_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [] );

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(person),
    }).then((res) => {
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("Failure creating user")
      }
    });

    return promise
  }

  return (
    <div className="container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter} 
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;