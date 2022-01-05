import ChampionCard from "./championCard"
import "./shop.css"

import Abomination from "../../../assets/traits/abomination.svg"
import Assassin from "../../../assets/traits/assassin.svg"
import Brawler from "../../../assets/traits/brawler.svg"
import Cannoneers from "../../../assets/traits/cannoneers.svg"
import Caretaker from "../../../assets/traits/caretaker.svg"
import Cavalier from "../../../assets/traits/cavalier.svg"
import Cruel from "../../../assets/traits/cruel.svg"
import Dawnbringer from "../../../assets/traits/dawnbringer.svg"
import Draconic from "../../../assets/traits/draconic.svg"
import Forgotten from "../../../assets/traits/forgotten.svg"
import Hellion from "../../../assets/traits/hellion.svg"
import Inanimate from "../../../assets/traits/inanimate.svg"
import Invoker from "../../../assets/traits/invoker.svg"
import Ironclad from "../../../assets/traits/ironclad.svg"
import Knight from "../../../assets/traits/knight.svg"
import Legionnaire from "../../../assets/traits/legionnaire.svg"
import Mystic from "../../../assets/traits/mystic.svg"
import Nightbringer from "../../../assets/traits/nightbringer.svg"
import Ranger from "../../../assets/traits/ranger.svg"
import Redeemed from "../../../assets/traits/redeemed.svg"
import Renewer from "../../../assets/traits/renewer.svg"
import Revenant from "../../../assets/traits/revenant.svg"
import Sentinel from "../../../assets/traits/sentinel.svg"
import Skirmisher from "../../../assets/traits/skirmisher.svg"
import Spellweaver from "../../../assets/traits/spellweaver.svg"
import Victorious from "../../../assets/traits/victorious.svg"

export default function Shop({gold, setShopOffer, shopOffer,areChampionsLoaded,setBoard}) {

    let champion1;
    let champion2;
    let champion3;
    let champion4;
    let champion5;

    if(areChampionsLoaded) {
        champion1=shopOffer[0];
        champion2=shopOffer[1];
        champion3=shopOffer[2];
        champion4=shopOffer[3];
        champion5=shopOffer[4];
    }

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

    function getManyTraitImages(names){
        if(names === null){
            return [];
        }
        var imagesArray = [];
        names.forEach(image => {
            imagesArray=[...imagesArray,getTraitImage(image.Name)];
        });
        return imagesArray;
    }

    return (
        areChampionsLoaded ? 
        <div className="controlPanelShop">
            <ChampionCard index={0} shopOffer={shopOffer} setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} champion={champion1} traitImages={getManyTraitImages(champion1.Traits)}/>
            <ChampionCard index={1} shopOffer={shopOffer} setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} champion={champion2} traitImages={getManyTraitImages(champion2.Traits)}/>
            <ChampionCard index={2} shopOffer={shopOffer} setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} champion={champion3} traitImages={getManyTraitImages(champion3.Traits)}/>
            <ChampionCard index={3} shopOffer={shopOffer} setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} champion={champion4} traitImages={getManyTraitImages(champion4.Traits)}/> 
            <ChampionCard index={4} shopOffer={shopOffer} setShopOffer={setShopOffer} gold={gold} setBoard={setBoard} champion={champion5} traitImages={getManyTraitImages(champion5.Traits)}/>
        </div> : null
    );
}

