import * as React from 'react';
import './menu.css';
import {useState, useEffect} from 'react';
import RefreshTraining from '../refreshtraining/refreshtraining';
import RefreshTrainingRS from '../refreshtraining/refreshtrainingRS';
import Compositions from '../compositions/compositions';
import ChooseMode from '../choosemode/choosemode'

export default function Menu() {

  const[rerollCounter, setRerollCounter]=useState(0);
  const[chooseMode, setChooseMode] = useState(true);
  const[displayRefreshTraining,setDisplayRefreshTraining]=useState(false);
  const[displayCompositions,setDisplayCompositions]=useState(false);

  const[freeTraining, setFreeTraining] = useState(false);
  const[timeReroll, setTimeReroll] = useState(false);
  const[roundSimulator, setRoundSimulator] = useState(false);

  const[champions, setChampions] = useState([]);
  const[getChampions, setGetChampions] = useState(true);

  var boardArray = Array.from({length:18}, (value,index) => ({
    IsBusy:false,
    Index: index,
    Champion:null,
    Star:0,
    ToMove:false       
  }
  ));

  const[board,setBoard] = useState(boardArray);
  const[shopOffer,setShopOffer] = useState(null);
  const[copiesOffTheDeck, setCopiesOffTheDeck] = useState(null);
  const[championObjective, setChampionObjective] = useState(null);

  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://localhost:44325/champion/getChampions', requestOptions)
    .then((response)=> {
        if(response.ok) {
            return response.json();
        }
        throw response;
    })
    .then((data) => {
        setChampions(data);
        var copiesArray = Array.from(champions, (value) => ({
          ChampionId:value.ChampionId,
          Name:value.Name,
          CopiesBought:0,
          Avatar:value.Avatar,
          Cost:value.Cost
        }));
        setCopiesOffTheDeck(copiesArray);
        setGetChampions(false);
    })
    .catch((error) => {
      console.log(error);
    })
  },[getChampions])

  const refreshTrainingString = "TRAINING";
  const simulatorSettingsString = "SETTINGS";
  const chooseModeString = "CHOOSE MODE"

  const areButtonsDisabled = (freeTraining === false && timeReroll === false && roundSimulator === false);

  function verticalStringDisplay(word) {
    
    var verticalWord = [word.length];
    for (let index = 0; index < word.length; index++) {
      verticalWord[index] = word[index];
    }
    var finalVerticalWord = verticalWord.map(x=>
      <div>{x}</div>)
    return finalVerticalWord;
  }

  return (
    <div className="menu">
      <div className="menuRow">

            <div className="menuCol10" style={{background:"rgba(21,32,33,255)"}}>
              <div className="title">
                {displayRefreshTraining ? verticalStringDisplay(refreshTrainingString) : ""}
                {displayCompositions ? verticalStringDisplay(simulatorSettingsString) : ""}
                {chooseMode ? verticalStringDisplay(chooseModeString) : ""}
              </div>
            </div>

            <div className="menuCol8x">
                
                {(timeReroll || freeTraining) ? <RefreshTraining roundSimulator={roundSimulator} timeReroll={timeReroll} displayRefreshTraining={displayRefreshTraining} board={board} setBoard={setBoard} shopOffer={shopOffer} setShopOffer={setShopOffer} copiesOffTheDeck={copiesOffTheDeck} championObjective={championObjective} rerollCounter={rerollCounter} setRerollCounter={setRerollCounter}></RefreshTraining>
                : <RefreshTrainingRS roundSimulator={roundSimulator} timeReroll={timeReroll} displayRefreshTraining={displayRefreshTraining} board={board} setBoard={setBoard} shopOffer={shopOffer} setShopOffer={setShopOffer} copiesOffTheDeck={copiesOffTheDeck} championObjective={championObjective} rerollCounter={rerollCounter} setRerollCounter={setRerollCounter}> </RefreshTrainingRS>}
                <Compositions displayCompositions={displayCompositions} board={board} shopOffer={shopOffer} copiesOffTheDeck={copiesOffTheDeck} setCopiesOffTheDeck={setCopiesOffTheDeck} championObjective={championObjective} setChampionObjective={setChampionObjective}> </Compositions>
                <ChooseMode rerollCounter={rerollCounter} setRerollCounter={setRerollCounter}setBoard={setBoard} chooseMode={chooseMode} freeTraining={freeTraining} setFreeTraining={setFreeTraining} timeReroll={timeReroll} setTimeReroll={setTimeReroll} roundSimulator={roundSimulator} setRoundSimulator={setRoundSimulator} ></ChooseMode>
            </div>

            <div className="menuCol10 navigation">
              <div className="navRow3">
               <button className={`navButton ${displayRefreshTraining ? "isEnabled" : "isNotEnabled"} ${areButtonsDisabled ? "isDisabled" : ""}`}disabled={areButtonsDisabled}
               onClick = {
                 () => {
                    setDisplayRefreshTraining(true);
                    setDisplayCompositions(false);
                    setChooseMode(false);
                  }}> 
                    Refresh Training
               </button>
              </div>
              <div className="navRow3">
              <button className={`navButton ${displayCompositions ? "isEnabled" : "isNotEnabled"} ${areButtonsDisabled ? "isDisabled" : ""}`} disabled={areButtonsDisabled}
              onClick = {
                 () => {
                    setDisplayRefreshTraining(false);
                    setDisplayCompositions(true);
                    setChooseMode(false);
                  }}> 
                  Settings
                </button>
              </div>
              <div className="navRow3">
              <button className={`navButton ${chooseMode ? "isEnabled" : "isNotEnabled"}`}
              onClick = {
                 () => {
                    setDisplayRefreshTraining(false);
                    setDisplayCompositions(false);
                    setChooseMode(true);
                  }}> 
                  Choose Mode
                </button>
              </div>
            </div>
      </div>
    </div>
    
  )
}