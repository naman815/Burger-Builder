import React,{Component} from 'react'
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // componentWillUpdate(){
    //      console.log("order summary update");
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
        return <li key={igKey}><span style={{textTransform : 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
        <p><strong>Total Price : ₹ {this.props.price}</strong></p>
                <p>Continue to Check Out</p>
                <Button btnTyp="Danger" clicked={this.props.purchasedCanceled}>Cancel</Button>
                <Button btnTyp="Success" clicked={this.props.purchasedContinued}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;
