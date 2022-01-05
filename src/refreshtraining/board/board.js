import './board.css';
import Slot from './slot';

export default function Board({board,setBoard,toMove}) {

    return (
        <div className="board">
           <Slot index={0} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={1} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={2} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={3} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={4} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={5} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={6} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={7} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
           <Slot index={8} board={board} setBoard={setBoard} bfSlot={false} toMove={toMove}></Slot>
        </div>
    );
}