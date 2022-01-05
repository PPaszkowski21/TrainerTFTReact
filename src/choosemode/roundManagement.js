import "./choosemode.css"
import { useEffect, useState } from "react";
import { BASIC_INCOME_ON_LEVEL } from "../settings/constants";

export default function RoundManagement({level, setGold, gold, roundNumber}) {

    const[seriesGold, setSeriesGold] = useState(0);
    const[win, setWin] = useState(false);
    const[basicIncome, setBasicIncome] = useState(0);
    const[interest, setInterest] = useState(0);

    useEffect(()=> {
        let index = getIndexBasicIncome();
        setBasicIncome(BASIC_INCOME_ON_LEVEL[index])
        setInterest(getInterest());
        console.log(seriesGold);
        let valueToAdd = basicIncome + interest + seriesGold;
        if(win){
            valueToAdd+=1;
        }
        setGold(gold+valueToAdd);
    },[roundNumber])

    function getInterest() {
        let interest = Math.floor(gold/10);
        if(interest > 5)
        return 5;
        else
        return interest;
    }

    function getIndexBasicIncome() {
        if(roundNumber < 4)
            return roundNumber;
        else
            return 4;
    }

    const goldChange = (event) => {
        setSeriesGold(Number(event.target.value));
    }

    return(
        <div className="roundManagement">
            <div className="roundManagementRow">
                <label>Basic income {basicIncome}</label>
            </div>
            <div className="roundManagementRow">
                <label>Series gold</label>
                <input type="number" id="seriesGold" name="seriesGold" value={seriesGold} min={0} max={3} onChange={goldChange}></input>
            </div>
            <div className="roundManagementRow">
                <label>Win?</label>
                <input type="checkBox" id="win" name="win" value={win} min="0" max="200" onChange={()=>setWin(!win)}></input>
            </div>
            <div className="roundManagementRow">
                <label>Interests {interest}</label>
            </div>
        </div>
    );
}