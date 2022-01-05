import './controlpanel.css';
import goldImage from './assets/gold.png'
import { fontSize } from '@mui/system';

export default function Gold({timeReroll, roundSimulator, gold, setGold}) {
    return(
        <div className="goldDisplay">
            <img src={goldImage} alt="gold"/>
            {timeReroll && <label>∞</label>}
            {(!timeReroll && !roundSimulator) && <input type="number" id="gold" name="gold" value={gold} min="0" max="200" onChange={setGold}></input>}
            {roundSimulator && <label id="goldRS">{gold}</label>}
        </div>
    )
}