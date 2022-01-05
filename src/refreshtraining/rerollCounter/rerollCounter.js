import './rerollCounter.css'
import {LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION, CHAMPION_COPIES_IN_DECK } from '../../settings/constants.js';
import { useEffect, useState } from 'react';
import unknownChampion from '../../assets/unknownChampion.png'

export default function RerollCounter({timeReroll,roundSimulator, time, pause, reset,status, level, board, copiesOffTheDeck, rerollCounter, setRerollCounter,championObjective}) {

    const[probability,setProbability] = useState(0);
    const isSuccess = countChampionOnBoard();

    useEffect(() => {
        calculateChanceForSpecifiedChampion();
    },[level,championObjective,board,copiesOffTheDeck]);

    function countChampionOnBoard() {
        if(championObjective === null) {
            return false;
        }
        var copiesOnBoard = 0;
        board.forEach(champion => {
            if(champion.Champion !== null) {
                if(champion.Champion.ChampionId === championObjective.ChampionId) {
                    copiesOnBoard += Math.pow(3,champion.Star-1);
                 }
            }
        });
        if(copiesOnBoard === 9) {
            if(status !== "PAUSED")
            pause();
            return true;
        }
        else
        return false;
    }

    function calculateChanceForSpecifiedChampion() {
        
        if(championObjective === null)
        return;

        var copiesOnBoard = 0;
        var copiesOnSpecifiedLevelOnBoard = 0;
        var howManyChampionsCopiesOnSpecifiedLvlLeft = 0;

        board.forEach(champion => {
            if(champion.Champion !== null) {
                if(champion.Champion.ChampionId === championObjective.ChampionId) {
                    copiesOnBoard += Math.pow(3,champion.Star-1);
                } else if(champion.Champion.Cost === championObjective.Cost)
                {
                    copiesOnSpecifiedLevelOnBoard += Math.pow(3,champion.Star-1);
                }
            }   
        });

        var numberOfAvailableCopies = CHAMPION_COPIES_IN_DECK[championObjective.Cost-1] - copiesOnBoard;
        copiesOffTheDeck.forEach(champion => {
            if(champion.ChampionId === championObjective.ChampionId) {
                numberOfAvailableCopies-=champion.CopiesBought;
            }
            else if(champion.Cost === championObjective.Cost) {
                howManyChampionsCopiesOnSpecifiedLvlLeft+=(CHAMPION_COPIES_IN_DECK[championObjective.Cost-1]-champion.CopiesBought);
            }
        });
        howManyChampionsCopiesOnSpecifiedLvlLeft-=copiesOnSpecifiedLevelOnBoard;
        if(numberOfAvailableCopies <= 0) {
            setProbability(0);
            return;
        }
        var allChampions = howManyChampionsCopiesOnSpecifiedLvlLeft + numberOfAvailableCopies;
        var probability= LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION[level-1][championObjective.Cost-1] * (numberOfAvailableCopies/allChampions);
        setProbability(probability*100);
    }



    const championImageString = (championObjective ? ("data:image/png;base64," + championObjective.Avatar) : unknownChampion);
    const championName = championObjective ? championObjective.Name : "Select champion";

    return(
        <div className={`rerollContainer ${(timeReroll || roundSimulator) ? "timerMode" : "freeTrainingMode"}`}>
           <div className="reseter">
                <button 
                onClick={
                    () => {
                        if(timeReroll) {
                            reset();   
                        }
                        setRerollCounter(0)
                    }
                }>R</button>
           </div>
           <div className="counter">
                Rerolls: {rerollCounter}
           </div>
           <div className="objectiveAndProbability">
               <div className="objective">
                    <img src={championImageString} alt="championObjective"></img>
                    <text>{championName}</text>
               </div>
               <div className="probability">
                   <div className="probabilityNumberContainer">
                    <label id="probabilityNumber">{probability.toFixed(2)}</label>
                    <label id="percent"> %</label>
                   </div>
                {timeReroll ? 
                <label className=
                    {isSuccess ? "greenText" : null}> 
                    {isSuccess && time !== 0 ? `Success!!! in ${time}s` : "Keep searching!"}     
                    {isSuccess && time === 0 ? "... Continue!" : ""}
                </label> : null}
               </div>
           </div>
        </div>
    );
}