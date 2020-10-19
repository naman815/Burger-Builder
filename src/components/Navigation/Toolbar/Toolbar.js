import React from 'react'
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';
import Toggle from '../SideDrawer/Toggle/Toggle';

const Toolbar= (props)=> {
    return (
        <header className={classes.Toolbar}>
            <Toggle clicked ={props.clicked}/>
            <div className={classes.logo}>
            <Logo/>
            </div>
            
            <nav className={classes.DesktopOnly}>
                <NavigationItem/>
            </nav>
        </header>
    )
}
export default Toolbar;