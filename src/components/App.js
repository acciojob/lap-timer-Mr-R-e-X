import React, { useState, useEffect, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [min, setMin] = useState(Number(0));
  const [sec, setSec] = useState(Number(0));
  const [ms, setMS] = useState(Number(0));
  const [timer, setTimer] = useState(false);
  const [lap, setLap] = useState([]);
  let timeRef = useRef(null);
  useEffect(() => {
    if (timer) {
      timeRef.current = setInterval(() => {
        setMS((prevMS) => {
          if (prevMS === 99) {
            setSec((prevSec) => {
              if (prevSec === 59) {
                setMin((prevMin) => (prevMin += 1));
                return 0;
              }
              return prevSec + 1;
            });
            return 0;
          }
          return prevMS + 1;
        });
      }, 10);
    } else {
      clearInterval(timeRef.current);
    }
  }, [timer]);
  let Start = () => {
    if (!timer) {
      setTimer(true);
    }
  };

  let Stop = () => {
    setTimer(false);
  };
  let Lap = () => {
    let time = `${min < 10 ? "0" + min : min} : ${
      sec < 10 ? "0" + sec : sec
    } : ${ms < 10 ? "0" + ms : ms}`;
    setLap([...lap, time]);
  };
  let Reset = () => {
    setTimer(false);
    setMin(Number(0));
    setSec(Number(0));
    setMS(Number(0));
    setLap([]);
  };

  return (
    <div>
      <p>
        {" "}
        {min < 10 ? "0" + min : min} : {sec < 10 ? "0" + sec : sec} :{" "}
        {ms < 10 ? "0" + ms : ms}{" "}
      </p>
      <div>
        <button onClick={() => Start()}>Start</button>
        <button onClick={() => Stop()}>Stop</button>
        <button onClick={() => Lap()}>Lap</button>
        <button onClick={() => Reset()}>Reset</button>
      </div>
      <div>
        <ul>
          {lap.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
