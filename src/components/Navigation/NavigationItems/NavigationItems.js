import React from 'react'
import classes from './NavigationItems.css';
import NavItem from './NavItem/NavItem';

const NavigationItems=(props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem exact link="/" >
                Burger
            </NavItem>
            {props.isAuth ? <NavItem link="/orders" >
                Order
            </NavItem> : null}
            {
                !props.isAuth ?
                <NavItem link="/auth">LogIn/SignUp</NavItem> :
                <NavItem link="/logout">LogOut</NavItem> 
            }
        </ul>
    )
}

export default NavigationItems;
