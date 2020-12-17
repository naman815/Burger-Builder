import React from 'react'
import classes from './NavigationItems.css';
import NavItem from './NavItem/NavItem';

const NavigationItems=(props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem exact link="/" >
                Burger Builder
            </NavItem>
            <NavItem link="/orders" >
                Order
            </NavItem>
        </ul>
    )
}

export default NavigationItems;
