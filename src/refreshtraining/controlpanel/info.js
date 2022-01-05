import './controlpanel.css';
import {LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION} from '../../settings/constants'; 

export default function Info({level, exp, maxExp, roundSimulator}) {
    return(
        <div className="infoDisplay">
            <div className="lvlLabel">
                <b>Level - {level}</b>
                {roundSimulator && <b> Exp {exp}/{maxExp}</b>}
            </div>
            <div className="chanceLabel">
                Chance for - {mapPercentForSpecifiedLvl(level)}
            </div>
    </div>
    )
}

function mapPercentForSpecifiedLvl(level) {
    var PercentForDisplay = LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION[level-1].map((x,i) => 
    <>{i+1}: {x*100}% </>
)
    return PercentForDisplay;
}