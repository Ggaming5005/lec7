import React, { useState, useEffect } from "react";
import "./app.css";
import MySVG from "./assets/Frame.svg";
import MySVG1 from "./assets/Group 2.svg";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="app-container">
      <div className="group-4">
        <h2 className="advice-heading">ADVICE #{adviceId}</h2>
        <div className="quote">
          {loading ? <div className="loader"></div> : <span>“{advice}”</span>}
        </div>
        <div className="group-2">
          <img src={MySVG1} alt="Reroll Advice" className="svg-icon" />
        </div>
      </div>
      <div className="group">
        <button className="svg-button" onClick={fetchAdvice} disabled={loading}>
          <img src={MySVG} alt="Get New Advice" className="svg-icon" />
        </button>
      </div>
    </div>
  );
};

export default App;
