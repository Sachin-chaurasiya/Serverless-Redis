import React from "react";

const People = ({ people }) => {
  return (
    <ul className="list">
      {people?.map(({ name, height, gender }, index) => (
        <li className="list-item" key={index}>
          <div>Name: {name}</div>
          <div>Height: {height}</div>
          <div>Gender: {gender}</div>
        </li>
      ))}
    </ul>
  );
};

export default People;
