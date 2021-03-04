import React, { useState, useEffect } from "react";

const ToyCard = (props) => {
  // const {id, image, name} = props.toy // destructuring is an option

  const [timer, setTimer] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer);
  }, []);

  const startTimer = () => {
    setTimer(setInterval(() => setSeconds((s) => s + 1), 1000));
  };

  return (
    <div class="card" id={`toy-${props.id}`}>
      <h2>{props.name}</h2>
      <img src={props.image} class="toy-avatar" />
      <p>{props.likes} Likes </p>
      <div>{seconds}</div>
      <button class="like-btn" onClick={props.handleClick}>
        Like &lt;3
      </button>
    </div>
  );
};

export default ToyCard;
