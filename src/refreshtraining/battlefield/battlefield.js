import Slot from '../board/slot';
import '../board/board.css'

export default function Battlefield({level,board,setBoard,toMove}) {

    var rows = [];
    for (var i = 9; i < level + 9; i++) {
        rows.push(<Slot key={i} index={i} board={board} setBoard={setBoard} bfSlot={true} even={i%2===0} toMove={toMove}></Slot>);
    }

    return (
        <div className="battlefield"> 
            {rows}
        </div>
        
    );
}