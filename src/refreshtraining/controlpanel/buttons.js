import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useState} from 'react';
import './controlpanel.css';

export default function Buttons({timeReroll,roundSimulator,exp, setExp, level,setLevel,gold,setGold, rerollCounter, setRerollCounter}) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if(roundSimulator){
            setExp(exp+4,true);
        }
        else {
            setAnchorEl(event.currentTarget);     
        }
    };

    const lvlChange = (event) => {
        setLevel(Number(event.target.value));
    }

    const refreshShopGoldCost = (gold) => {
        if(gold < 2) {
            return;
        }
        if(!timeReroll) {
            setGold(gold-2);
        }
        setRerollCounter(rerollCounter + 1);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
            <div className="controlPanelLeftPart">
                <Button id="changeLevelButton" className="stretch" aria-describedby={id} variant="contained" disabled={gold<4} onClick={handleClick}>
                </Button>
                    <Popover 
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <FormControl component="fieldset">
                            <FormLabel component="legend"
                            >LVL:</FormLabel>
                            <RadioGroup
                                aria-label="lvl"
                                defaultValue={level}
                                name="radio-buttons-group"
                                onChange={lvlChange}
                                style={{backgroundColor:"rgba(21,32,33,255)", border: "rgba(204, 183, 64, 0.733) inset 5px", paddingLeft:"10px"}}
                            >
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="1" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="1" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="2" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="2" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="3" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="3" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="4" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="4" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="5" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="5" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="6" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="6" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="7" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="7" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="8" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="8" />
                                <FormControlLabel style={{color: "rgba(204, 183, 64, 0.733)"}} value="9" control={<Radio style={{color:"rgba(204, 183, 64, 0.733)"}}/>} label="9" />
                            </RadioGroup>
                        </FormControl>
                    </Popover>
                    <button id="refreshButton" className="stretch" 
                    onClick={() => refreshShopGoldCost(gold)}>
                        
                    </button>
            </div>)
    
}

