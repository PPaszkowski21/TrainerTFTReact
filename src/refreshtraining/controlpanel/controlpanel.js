import './controlpanel.css';
import {useEffect, useState} from 'react';
import Buttons from './buttons';
import Shop from './shop/shop';
import Info from './info';
import Gold from './gold';
import {LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION} from '../../settings/constants'; 
import Timer from '../../choosemode/timer';

export default function ControlPanel({exp, setExp, maxExp, timeReroll, roundSimulator, board,setBoard, level, setLevel, gold, setGold, shopOffer, setShopOffer, copiesOffTheDeck, rerollCounter, setRerollCounter}) {

    const[previousRerollCounter, setPreviousRerollCounter] = useState(rerollCounter);


    function CountChampions() {
        
        if(copiesOffTheDeck===null){
            return [];
        }
        var helper = [];
        board.forEach(champion =>  {
            if(champion.Champion !== null) {
                helper = [...helper, {ChampionId:champion.Champion.ChampionId, CopiesBought:Math.pow(3,champion.Star-1)} ]
            }
        })

        var holder = {};
        helper.forEach(function(d) {
        if (holder.hasOwnProperty(d.ChampionId)) {
            holder[d.ChampionId] = holder[d.ChampionId] + d.CopiesBought;
        } else {
            holder[d.ChampionId] = d.CopiesBought;
        }
        });

        var boardForRequest = [];

        for (var prop in holder) {
            boardForRequest.push({ ChampionId: prop, CopiesBought: holder[prop] });
        }

        copiesOffTheDeck.forEach(champion => {
            var index = boardForRequest.findIndex(x=>x.ChampionId === champion.ChampionId);
            if(index !== -1) {
                boardForRequest[index].CopiesBought += champion.CopiesBought;
            }
            else {
                boardForRequest = [...boardForRequest, {ChampionId: champion.ChampionId, CopiesBought: champion.CopiesBought}];
            }
        });

        return boardForRequest;
    }

    function shopRequest() {

        if(rerollCounter === previousRerollCounter && rerollCounter !== 0) {
            if(shopOffer !== null){
                return;
            }
        }
        
        var championsOnTheBoard = CountChampions();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(
                {
                    "ChampionsOnTheBoard":championsOnTheBoard,
                    "Percentage":LEVEL_PERCENTAGE_PERCENT_FOR_CHAMPION[level-1]
                }
            )
        };
        fetch('https://localhost:44325/champion/refreshShop', requestOptions)
        .then((response)=> {
            if(response.ok) {
                return response.json();
            }
            throw response;
        })
        .then((data) => {
            let newShopOffer =  [
                {Champion:data[0].Champion,Traits:data[0].Traits, Star:1, ToMove:false},
                {Champion:data[1].Champion,Traits:data[1].Traits, Star:1, ToMove:false},
                {Champion:data[2].Champion,Traits:data[2].Traits, Star:1, ToMove:false},
                {Champion:data[3].Champion,Traits:data[3].Traits, Star:1, ToMove:false},
                {Champion:data[4].Champion,Traits:data[4].Traits, Star:1, ToMove:false}
            ]
            setShopOffer(null);
            setShopOffer(newShopOffer)
        })
        .catch((error) => {
            console.log(error);
            let newShopOffer =  [
                {Champion:null, Star:0, ToMove:false},
                {Champion:null, Star:0, ToMove:false},
                {Champion:null, Star:0, ToMove:false},
                {Champion:null, Star:0, ToMove:false},
                {Champion:null, Star:0, ToMove:false}
            ]
            setShopOffer(null);
            setShopOffer(newShopOffer)
        })
    }

    useEffect(shopRequest,[rerollCounter])

    const goldChange = (event) => {
        setGold(Number(event.target.value));
    }

    return (
        <div className="controlPanelContainer">
            <div className="controlPanelTopPart">     
                <Info roundSimulator={roundSimulator} maxExp={maxExp} exp={exp} level={level} ></Info>
                <Gold roundSimulator={roundSimulator} timeReroll={timeReroll} gold={gold} setGold={goldChange} ></Gold>
            </div>
            <div className="controlPanelDownPart">
                <Buttons exp={exp} setExp={setExp} timeReroll={timeReroll} roundSimulator={roundSimulator} level={level} setLevel={setLevel} gold={gold} setGold={setGold} rerollCounter={rerollCounter} setRerollCounter={setRerollCounter}></Buttons>
                <Shop setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} shopOffer={shopOffer} areChampionsLoaded = {shopOffer ? true : false}> </Shop>
            </div>
        </div>
        
    );
}