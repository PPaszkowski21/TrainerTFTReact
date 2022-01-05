import './board.css';

export default function Slot({index, board, setBoard,even,bfSlot, toMove}) {

    const champion = board[index] ? board[index].Champion : null;
    const star = board[index].Star;
    const championImageString = "data:image/png;base64," + (champion ? champion.Avatar : "");

    const bfClass = bfSlot ? (even ? " bfSlotEven" : "bfSlotNotEven") : ""; 
    const toMoveClass = board[index].ToMove ? "ToMove" : "";

    return (
        <div key={index + " s"} className={`slot ${toMoveClass} ${bfClass}`}
            style ={{ 
                backgroundImage: `url(${championImageString})`, 
                backgroundSize: "100% 100%", 
                transform: bfClass ? "" : `rotateY(${(index+1)*1.3}deg) rotateX(35deg)`
            }}
            onClick={()=> toMove(index,true)}>
            {(star !== 0) ? 
            <div className="buttonAndStars">    
                <div className={`slotFrame star${star}`}/>
                <button 
                onClick={() => {setBoard(index,true); toMove(index,false)}}>X</button>
            </div> : <div className="placeText"> {bfSlot ? "Battlefield" : "Board"} </div>}
        </div>
    );
}