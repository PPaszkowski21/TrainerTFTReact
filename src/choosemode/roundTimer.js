import React from 'react';
import './choosemode.css';

export default function RoundTimer({time, start, pause, reset, status,goNextRound}) {

    if(time === 0) {
        resetTimer();
    }

    function resetTimer() {
        goNextRound();
        reset();
        start();
    }

    return (
      <div className="timerContainerRS">
        <label>Timer</label>
        <div className="timerButtonsRS">
          {status === "STOPPED" || status === "PAUSED" ? 
          <button onClick={start}>Start</button> : 
          <button onClick={pause}>Pause</button>}
          <button onClick={resetTimer}>Next Round</button>
        </div>
        <label>Next round<br/> in: {time}s</label>
        {status === 'RUNNING' && <label>Running... !</label>}
    </div>
    );
}