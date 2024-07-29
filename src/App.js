import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";

import Players from "./components/players/Players";
import Timer from "./components/timer/Timer";
import GameStats from "./components/gameStats/GameStats";

function App() {
  const winner = useSelector((state) => state.timer.winner);

  useEffect(() => {
    if (winner !== null) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <React.Fragment>
      <Players />
      <Timer />
      <GameStats />
    </React.Fragment>
  );
}

export default App;
