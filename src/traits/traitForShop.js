import './traits.css'

export default function ChampionTraits({traits,images}) {

    return(
        <div className="traitContainerForShop">
            <div className="trait">
                <div className="traitBackground">
                    <img src={images[0]} alt="img"/>
                </div>
                <div className="traitText">
                    {traits[0].Name}
                </div>
            </div>
            <div className="trait">
                <div className="traitBackground">
                    <img src={images[1]} alt="img"/>
                </div>
                <div className="traitText">
                    {traits[1].Name}
                </div>
            </div>
            {(images.length === 3) ?
            <div className="trait">
                <div class="traitBackground">
                    <img src={images.length === 3 ? images[2] : null} alt="img"/>
                </div>
                <div className="traitText">
                    {traits.length === 3 ? traits[2].Name : null }
                </div>
            
            </div> : null}
        </div>
        );
}