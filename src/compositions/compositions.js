import './compositions.css';
import ChampionList from './championList'
import {useState} from 'react';
import Switch from '@mui/material/Switch'

export default function Compositions({displayCompositions, board, shopOffer, copiesOffTheDeck, setCopiesOffTheDeck, championObjective, setChampionObjective }) {

    const[championsOffDisplay, setChampionsOffDisplay] = useState(false);
    const handleChange = (event) => {
        setChampionsOffDisplay(!championsOffDisplay);
    }

    return (
        displayCompositions ? 
        <div className="backgroundTransparent">
            <div className="compositionsContainer">
                <div className="gui">
                    <div className="switchAndInstruction">
                        <div className="instruction">
                            Select champion, which you want to reroll and it's copies off.
                        </div>
                        <label> Champions Available</label>
                        <div className="switch">
                            <Switch
                                checked={championsOffDisplay}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color="default"
                            />
                        </div>
                        <label> Champions Off The Deck </label>
                    </div>
                </div>
                <ChampionList key="championList" championsOffDisplay={championsOffDisplay} board={board} copiesOffTheDeck={copiesOffTheDeck} setCopiesOffTheDeck={setCopiesOffTheDeck} championObjective={championObjective} setChampionObjective={setChampionObjective}></ChampionList>
            </div>
        </div> : null
    );
}