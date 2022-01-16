import React from "react";

const Planets = ({ planets }) => {
  return (
    <ul className="list">
      {planets?.map(({ name, climate, terrain }, index) => (
        <li className="list-item" key={index}>
          <div>Name: {name}</div>
          <div>Climate: {climate}</div>
          <div>Terrain: {terrain}</div>
        </li>
      ))}
    </ul>
  );
};

export default Planets;
