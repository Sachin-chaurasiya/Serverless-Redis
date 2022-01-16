import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Planets from "./components/Planets";
import People from "./components/People";

const App = () => {
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getData = async (event) => {
    try {
      const { name } = event.target;
      setCategory(name);
      setIsLoading(true);
      const { data } = await axios({
        url: "/api/starwars",
        method: "POST",
        data: { name },
      });
      setResult(data);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div onClick={getData}>
        <h1>Serverless Redis Demo</h1>
        <Button variant="info" name="planets" className="action-btn">
          Planets
        </Button>
        <Button variant="info" name="people" className="action-btn">
          People
        </Button>
        {isLoading && <p className="loading">Loading...</p>}
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        {category === "planets" ? (
          <Planets planets={result} />
        ) : (
          <People people={result} />
        )}
      </div>
    </div>
  );
};

export default App;
