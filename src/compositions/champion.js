import './compositions.css'
import {useState} from 'react'
import {CHAMPION_COPIES_IN_DECK} from '../settings/constants'

export default function Champion({championsOffDisplay, index, board, copiesOffTheDeck, setCopiesOffTheDeck, championObjective, setChampionObjective}) {

    const[champion,setChampion] = useState(copiesOffTheDeck[index]);
    const championImageString = "data:image/png;base64," + (champion ? champion.Avatar : "");
    const championsOnTheBoard = CountChampionsOnTheBoard();
    const max = CountAvailableChampions();

    function CountChampionsOnTheBoard() {
        var counter = 0;
        board.forEach(champ =>  {
            if(champ.Champion !== null && champ.Champion.ChampionId === champion.ChampionId) {
                counter += Math.pow(3,champ.Star-1);

            }
        })
        return counter;
    }

    function CountAvailableChampions() {
        var result = CHAMPION_COPIES_IN_DECK[champion.Cost - 1] - championsOnTheBoard;
        return result;
    }

    function checkIfObjective() {
        if(championObjective !== null && champion.ChampionId === championObjective.ChampionId){
            return true
        }
        return false;
    }

    const copiesChange = (event) => {


        var value = Number(event.target.value);

        if( value <= max && value >= 0 ) {
            var newCopiesOffTheDeck = [...copiesOffTheDeck];
            newCopiesOffTheDeck[index].CopiesBought = value;
            setCopiesOffTheDeck(null);
            setCopiesOffTheDeck(newCopiesOffTheDeck);
        }
    }


    return(
        <button className={`championContainer ${checkIfObjective() ? "isObjective" : "isNotObjective"}`} 
        onClick={()=> setChampionObjective(champion)}>
            <label>
                {champion.Name}
            </label>
            <div className="champion"
            style ={{ backgroundImage: `url(${championImageString})`}} >
            </div>
            <div className="championControlPanel">
                {championsOffDisplay ?
                    <input type="number" id="copies" name="copies" value={champion.CopiesBought} min="0" max={max} onChange={copiesChange}></input>
                : <input type="number" id="copies" name="copies" value={max-champion.CopiesBought} min="0" max={max} onChange={copiesChange} disabled></input>} 
                <label> /{CHAMPION_COPIES_IN_DECK[champion.Cost - 1]} </label>
            </div>
            <label>Board: {championsOnTheBoard}</label>
        </button>
    );
}