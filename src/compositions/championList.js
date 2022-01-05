import './compositions.css';
import Champion from './champion';

export default function ChampionList({championsOffDisplay, board, copiesOffTheDeck, setCopiesOffTheDeck, setChampionObjective, championObjective}) {

    function compare(a,b) {
        if(a.Cost < b.Cost) {
            return -1
        }
        if(a.Cost > b.Cost) {
            return 1;
        }
        return 0;
    }

    var copiesOffTheDeckSorted = copiesOffTheDeck.sort(compare);
    var rows = [];
    for (var i = 0; i < copiesOffTheDeckSorted.length; i++) {
        rows.push(
            <Champion key={copiesOffTheDeckSorted[i].ChampionId} 
                copiesOffTheDeck={copiesOffTheDeckSorted} 
                setCopiesOffTheDeck={setCopiesOffTheDeck}
                championsOffDisplay={championsOffDisplay}
                board={board}
                index={i}
                setChampionObjective={setChampionObjective}
                championObjective={championObjective}> 
            </Champion>
        );
    }

    return (
        <div className="championList"> 
            {rows}
        </div>
        
    );
}