import React from 'react'
import classes from './Toggle.css';

const Toggle = (props)=> {
    return (
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default Toggle; 