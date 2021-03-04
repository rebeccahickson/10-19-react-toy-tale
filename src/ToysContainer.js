import toysObj from "./database";
import ToyCard from "./ToyCard";
import React, { useState, useEffect } from "react";

// when state changes, a rerender is caused
// if we want to utilize state we need a Class Component

// const toys =

const ToysContainer = () => {
  // sets INITIAL STATE

  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const url = "http://localhost:3000/toys";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setToys(json);
      });
  }, []);

  const handleClick = (event) => {
    const toyId = event.target.parentElement.id.split("-")[1];
    const toyIndex = toys.findIndex((toy) => toy.id == toyId);
    const currentToy = toys[toyIndex];
    const url = `http://localhost:3000/toys/${toyId}`;

    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ likes: currentToy.likes + 1 }),
    };
    fetch(url, configObj)
      .then((res) => res.json())
      .then((json) => {
        setToys([
          ...toys.slice(0, toyIndex),
          json,
          ...toys.slice(toyIndex + 1),
        ]);
      });
  };

  const makeToyCards = () => {
    let displayedToys = toys;
    if (search) {
      displayedToys = toys.filter((toy) =>
        toy.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return displayedToys.map((toy) => (
      <ToyCard
        toy={toy}
        id={toy.id}
        name={toy.name}
        image={toy.image}
        likes={toy.likes}
        handleClick={handleClick}
      />
    ));
  };

  const handleInputChange = (e) => {
    const search = e.target.value;
    setSearch(search);
  };

  return (
    <div id="toy-container">
      <div>
        <input
          type="text"
          placeholder="Search for a toy..."
          onChange={handleInputChange}
        />
      </div>
      {makeToyCards()}
    </div>
  );
};

export default ToysContainer;
