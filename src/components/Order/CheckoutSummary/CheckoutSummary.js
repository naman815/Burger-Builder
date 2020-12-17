import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css';

const CheckoutSummary=(props)=> {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope the Burger tastes good!!</h1>
            <div className={classes.burger}>
                <Burger ingredients ={props.ingredients}/>
            </div>
            <Button btnTyp="Danger" clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnTyp="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}
export default CheckoutSummary;