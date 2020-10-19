import React from 'react'
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props)=> {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
    return <li key={igKey}><span style={{textTransform : 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price : ₹ {props.price}</strong></p>
            <p>Continue to Check Out</p>
            <Button btnTyp="Danger" clicked={props.purchasedCanceled}>Cancel</Button>
            <Button btnTyp="Success" clicked={props.purchasedContinued}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;