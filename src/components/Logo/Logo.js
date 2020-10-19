import React from 'react'
import burgerLogo from '../../assets/images/logo.png';
import classes from './Logo.css'

const logo= (props)=> {
    return (
        <div className={classes.Logo}>
           <img src={burgerLogo} alt = "McDonald's"/> 
        </div>
    )
}

export default logo;