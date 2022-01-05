import ControlPanel from './controlpanel/controlpanel'
import Battlefield from './battlefield/battlefield'
import Board from './board/board'
import './refreshtraining.css';
import {useState} from 'react';
import RerollCounter from './rerollCounter/rerollCounter';
import ActiveTraits from '../traits/activeTraits';
import Timer from '../choosemode/timer';
import { useTimer } from 'use-timer';

export default function RefreshTraining({displayRefreshTraining, board, setBoard, shopOffer, setShopOffer, copiesOffTheDeck, championObjective, rerollCounter, setRerollCounter, timeReroll, roundSimulator}) {

    const {time, start, pause, reset, status} = useTimer();

    const[level,setLevel] = useState(1);
    const[gold,setGold]=useState(50);

    function lvlChange(lvl) {
        if(lvl<level){
            moveChampionsIfBoardDecreased(lvl);
        }
        setLevel(lvl);
    }

    const checkIfEnoughGold = (diff) => {
        if(gold+diff<0) {
            return false;
        }
        return true;
    }

    const goldManagement = (diff) => {
        if(timeReroll) {
           diff = 0;
        }
        setGold(gold+diff);
    }

    function addToBoard(championToAdd) {

        var empty = board.findIndex(place=>place.IsBusy === false && place.Index<level+9);
        if(!checkIfEnoughGold(-championToAdd.Champion.Cost))
            return false;
        if(empty !== -1 ) {
            if(empty > level+9) {
                return false;
            }
            promoteChampion(championToAdd);
            var success = canAdd(championToAdd,empty);
            goldManagement(-championToAdd.Champion.Cost)
            return success;
        }
        else if(empty === -1) {
            var promoteSuccess = promoteChampion(championToAdd) 
            if(promoteSuccess) {
                var newEmpty = board.findIndex(place=>place.IsBusy === false);
                canAdd(championToAdd,newEmpty);
                goldManagement(-championToAdd.Champion.Cost);
            }
            return promoteSuccess;
        }
        else {
            return false;
        }
    }

    function canAdd(championToAdd,empty) {
            checkIfEnoughGold(-championToAdd.Champion.Cost);
            setGold(-championToAdd.Champion.Cost)
            var newBoard = [...board];
            newBoard[empty].Champion = championToAdd.Champion;
            newBoard[empty].Star = championToAdd.Star;
            newBoard[empty].IsBusy = true;
            setBoard(null);
            setBoard(newBoard);
            return true;
    }

    function calculateRefund(champion) {
        switch(champion.Star) {
            case 1:
                return champion.Champion.Cost;
            case 2:
                if(champion.Champion.Cost === 1)
                return champion.Champion.Cost*3;
                return champion.Champion.Cost*3-1;
            case 3:
                return champion.Champion.Cost*9-1;
            default:
                return 0;
        }
    }

    function promoteChampion(champion) {
        var copiesCounter = 0;
        var indexTable = [];
        for (let index = 0; index < board.length; index++) {
            
            const element = board[index];
            if(element.Champion === null || element.Star === 3) {
                continue;
            }

            if(element.Champion.Name === champion.Champion.Name && element.Star === champion.Star) {
                indexTable = [...indexTable,index]
                copiesCounter = copiesCounter + 1;
                
                if(copiesCounter === 2) {
                    champion.Star++;
                    indexTable.forEach(element => {
                        removeFromBoard(element,false);
                    });
                    promoteChampion(champion);
                    return true;   
                }
            }
        }
        return false;
    }

    function removeFromBoard(index, refund) {
        if(board[index].IsBusy === true)
        {
            if(refund)
            {
                goldManagement(calculateRefund(board[index]));
            }
            let newBoard = [...board]; 
            newBoard[index].Champion = null;
            newBoard[index].Star = 0;
            newBoard[index].IsBusy = false;
            setBoard(null);
            setBoard(newBoard);
            return true;
        }
    }

    function moveChampionsIfBoardDecreased(lvl) {
        var maxAvailableIndex = lvl + 8;
        var indexTable = [];
        var emptyIndexes = [];
        for (let index = 0; index < board.length; index++) {
            const element = board[index];
        
            if(element.IsBusy === false && index <= maxAvailableIndex) {
                emptyIndexes = [...emptyIndexes, index];
            }
            else if(element.IsBusy === true && index > maxAvailableIndex) {
                indexTable = [...indexTable,index]
            }
        }

        indexTable.forEach(element => {
            if(emptyIndexes.length > 0) {
                var empty = emptyIndexes.splice(0,1)
                var newBoard = [...board];
                newBoard[empty].Champion = board[element].Champion;
                newBoard[empty].Star = board[element].Star;
                newBoard[empty].IsBusy = true;
                removeFromBoard(element, false);
                setBoard(null);
                setBoard(newBoard);

            } else {
                removeFromBoard(element,true);
            }
        });
        
    }

    function toMove(index) {
        let index2 = board.findIndex(x=>x.ToMove === true);
        var newBoard;
        if(index2 === -1){
            board[index].ToMove = true;
            newBoard = [...board];
            setBoard(null);
            setBoard(newBoard);

        } else {
            board[index2].ToMove = false;
            newBoard = [...board];
            var helperChampion = board[index2].Champion;
            var helperStar = board[index2].Star;
            var helperIsBusy = board[index2].IsBusy;
            newBoard[index2].Champion = board[index].Champion;
            newBoard[index2].Star = board[index].Star;
            newBoard[index2].IsBusy = board[index].IsBusy;
            newBoard[index].Champion = helperChampion;
            newBoard[index].Star = helperStar;
            newBoard[index].IsBusy = helperIsBusy;
            setBoard(null);
            setBoard(newBoard);
        }
    }

    return (
        displayRefreshTraining ? 
        <div className="refreshTrainingContainer">
            <div className="traitsAndReroll">
                <ActiveTraits board={board}/>
                {timeReroll ? <Timer time={time} start={start} pause={pause} reset={reset} status={status} ></Timer> : null}
                <RerollCounter pause={pause} reset={reset} time={time} status={status} timeReroll={timeReroll} level={level} board={board} rerollCounter={rerollCounter} setRerollCounter={setRerollCounter} championObjective={championObjective} copiesOffTheDeck={copiesOffTheDeck}/>
            </div>
            <Battlefield level={level} board={board} setBoard={removeFromBoard} toMove={toMove}/>
            <Board board={board} setBoard={removeFromBoard} toMove={toMove}/>
            <ControlPanel timeReroll={timeReroll} roundSimulator={roundSimulator} board={board} setBoard={addToBoard} level={level} setLevel={lvlChange} gold={gold} setGold={setGold} shopOffer={shopOffer} setShopOffer={setShopOffer} copiesOffTheDeck={copiesOffTheDeck} rerollCounter={rerollCounter} setRerollCounter={setRerollCounter}/> 
        </div> : null
    );
}