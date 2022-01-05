import './choosemode.css'

export default function ChooseMode({rerollCounter, setRerollCounter, setBoard, chooseMode, freeTraining, setFreeTraining, timeReroll, setTimeReroll, roundSimulator, setRoundSimulator}) {

    const boardArray = Array.from({length:18}, (value,index) => ({
        IsBusy:false,
        Index: index,
        Champion:null,
        Star:0,
        ToMove:false       
      }
      ));

    return(
        chooseMode ? 
        <div className="chooseModeContainer">
            <div class="titleMode">
                <div class="titleText">Teamfight Tactics  <br/>Refresh Shop Simulator</div>
            </div>
            <div className="buttonsMode">
                <button className={`modeContainer freeTraining ${freeTraining ? "modeOn" : "modeOff"}`}
                onClick={() => 
                {setFreeTraining(true)
                setTimeReroll(false)
                setRoundSimulator(false)
                setBoard(boardArray)
                setRerollCounter(0)}
                }>
                Free Training
                </button>
                <button className={`modeContainer timeReroll ${timeReroll ? "modeOn" : "modeOff"}`}
                onClick={() => 
                {setTimeReroll(true)
                setFreeTraining(false)
                setRoundSimulator(false)
                setBoard(boardArray)
                setRerollCounter(0)}
                }>
                Time Reroll
                </button>
                <button className={`modeContainer roundSimulator ${roundSimulator ? "modeOn" : "modeOff"}`}
                onClick={() => 
                {setRoundSimulator(true)
                setTimeReroll(false)
                setFreeTraining(false)
                setBoard(boardArray)
                setRerollCounter(0)}
                }>
                Round Simulator
                </button>
            </div>
        </div> : null
    );
}