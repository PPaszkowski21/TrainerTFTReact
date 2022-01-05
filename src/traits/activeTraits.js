import Abomination from "../assets/traits/abomination.svg"
import Assassin from "../assets/traits/assassin.svg"
import Brawler from "../assets/traits/brawler.svg"
import Cannoneers from "../assets/traits/cannoneers.svg"
import Caretaker from "../assets/traits/caretaker.svg"
import Cavalier from "../assets/traits/cavalier.svg"
import Cruel from "../assets/traits/cruel.svg"
import Dawnbringer from "../assets/traits/dawnbringer.svg"
import Draconic from "../assets/traits/draconic.svg"
import Forgotten from "../assets/traits/forgotten.svg"
import Hellion from "../assets/traits/hellion.svg"
import Inanimate from "../assets/traits/inanimate.svg"
import Invoker from "../assets/traits/invoker.svg"
import Ironclad from "../assets/traits/ironclad.svg"
import Knight from "../assets/traits/knight.svg"
import Legionnaire from "../assets/traits/legionnaire.svg"
import Mystic from "../assets/traits/mystic.svg"
import Nightbringer from "../assets/traits/nightbringer.svg"
import Ranger from "../assets/traits/ranger.svg"
import Redeemed from "../assets/traits/redeemed.svg"
import Renewer from "../assets/traits/renewer.svg"
import Revenant from "../assets/traits/revenant.svg"
import Sentinel from "../assets/traits/sentinel.svg"
import Skirmisher from "../assets/traits/skirmisher.svg"
import Spellweaver from "../assets/traits/spellweaver.svg"
import Victorious from "../assets/traits/victorious.svg"

import { useEffect, useState } from "react";
import './traits.css';

export default function ActiveTraits({board}) {

    const[activeTraits, setActiveTraits] = useState([]);

    function CountChampions() {
        var boardForRequest = [];
        for (let index = 9; index < board.length; index++) {

            const champion = board[index];
            if(champion.Champion !== null) {
                if(!boardForRequest.some(x=>x === champion.Champion.ChampionId)){
                    boardForRequest = [...boardForRequest, champion.Champion.ChampionId]
                }
            }
        }
        return boardForRequest;
    }

    useEffect(() => {
        var championsOnTheBoard = CountChampions();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(
                {
                   championIds: championsOnTheBoard,
                }
            )
        };
        fetch('https://localhost:44325/champion/gettraits', requestOptions)
        .then((response)=> {
            if(response.ok) {
                return response.json();
            }
            throw response;
        })
        .then((data) => {
            setActiveTraits(data);
        })
        .catch((error) => {
            console.log(error);
        })
        
    }, [board])

    const traitImages = {
        Abomination,
        Assassin,
        Brawler,
        Cannoneers,
        Caretaker,
        Cavalier,
        Cruel,
        Dawnbringer,
        Draconic,
        Forgotten,
        Hellion,
        Inanimate,
        Invoker,
        Ironclad,
        Knight,
        Legionnaire,
        Mystic,
        Nightbringer,
        Ranger ,
        Redeemed,
        Renewer,
        Revenant,
        Sentinel,
        Skirmisher,
        Spellweaver,
        Victorious,
    }

    function getTraitImage(name) {
        return traitImages[name];
    }

    var rows = [];
    for (var i = 0; i < activeTraits.length; i++) {
        rows.push(
            <div className="activeTrait">
                <div className={`activeTraitBackground ${activeTraits[i].Style}`}>
                    <img src={getTraitImage(activeTraits[i].Name)} alt="img"/>
                </div>
                <div className="activeTraitText">
                    {activeTraits[i].Active}/{activeTraits[i].Max} {activeTraits[i].Name}
                </div>
            </div>
        );
    }

    return(
        activeTraits.length !== 0 ? 
        <div className="activeTraitsContainer">{rows} </div> : <div className="activeTraitsContainer"></div>
    );
}