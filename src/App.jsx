import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(10800);
  const [running, setRunning] = useState(false);
  const [duration, setDuration] = useState(10800);

  useEffect(() => {
    let timer;
    if (running && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running, seconds]);

  const formatTime = () => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value);
    setDuration(value);
    setSeconds(value);
    setRunning(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">TimeToLearn</h1>

        <p className="subtitle">ช่วงเวลาอ่านหนังสือ</p>
        <div className={running ? "hourglass animate" : "hourglass"}>⏳</div>
        <h2 className="time">{formatTime()}</h2>

        <select onChange={handleDurationChange}>
          <option value={10800}>3 hours</option>
          <option value={7200}>2 hours</option>
          <option value={3600}>1 hour</option>
          <option value={1800}>30 minutes</option>
        </select>

        <div className="buttons">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Pause</button>
          <button
            onClick={() => {
              setSeconds(duration);
              setRunning(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;