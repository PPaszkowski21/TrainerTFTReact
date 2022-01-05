import "./championCard.css"
import {useState} from 'react';
import goldImage from '../assets/gold.png'
import ChampionTraits from '../../../traits/traitForShop'


export default function ChampionCard({index,shopOffer, setShopOffer, gold,champion, setBoard, traitImages}) {

    const[display, setDisplay] = useState(true);

    function buyChampion() {
        if(setBoard(champion)){
            setDisplay(false);
            var newShopOffer = [...shopOffer];
            newShopOffer[index] = {Traits:null, Champion:null};
            setShopOffer(newShopOffer)
        };
    }

    const championImageString = "data:image/png;base64," + (champion.Champion ? champion.Champion.ShopCard : "");
    return(
        (display && champion.Champion !== null && champion.Champion.ChampionId !== null) ? 
        <div className="championCard" onClick={() => buyChampion()}
        style ={{ backgroundImage: `url(${championImageString})` }} >
            <div className={`${gold < champion.Champion.Cost ? "grayOverlay" : ""}`}>

            </div>
            <div className={`championFrame frame${champion.Champion.Cost} `}>
                <div className="traits">
                    <ChampionTraits traits={champion.Traits} images={traitImages}></ChampionTraits>
                </div>
                <div className="nameAndCost">
                    <div className="name">
                        <p>{champion.Champion.Name}</p>
                    </div>
                    <div className="cost">
                        <img src={goldImage} alt="gold"/>
                        <p>{champion.Champion.Cost}</p>
                    </div>
                </div>
            </div>
        </div> : 
        <div className="championCard">
            <div className={`championFrame emptyFrame`}></div>
        </div>
    )
}