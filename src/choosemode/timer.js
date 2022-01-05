import React from 'react';
import './choosemode.css';

export default function Timer({time, start, pause, reset, status}) {

    return (
      <div className="timerContainer">
        <label>Timer</label>
        <div className="timerButtons">
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={reset}>Reset</button>
        </div>
        <label>Elapsed time: {time}s</label>
        {status === 'RUNNING' && <label>Running... !</label>}
    </div>
    );
}