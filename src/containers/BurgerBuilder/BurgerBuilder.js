import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../Hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES ={
    salad : 20,
    cheese : 30,
    patty : 30,
    chicken : 40
}

class BurgerBuilder extends Component {

    state={
        ingredients:{
            salad :0,
            cheese : 0,
            patty : 0,
            chicken :0
        },
        totalPrice : 15
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENT_PRICES[type];
         const newPrice = this.state.totalPrice + priceAddition;
         this.setState({
             ingredients : updatedIngredients,
             totalPrice : newPrice
         })
    }
    
    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];

        let updatedCount = oldCount;
        if(oldCount === 0){
            return;
        }
        else{
            updatedCount = oldCount-1;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
         const priceDeduction = INGREDIENT_PRICES[type];
         const newPrice = this.state.totalPrice - priceDeduction;
         this.setState({
             ingredients : updatedIngredients,
             totalPrice : newPrice
         })
    }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls add={this.addIngredientHandler}
                    remove = {this.removeIngredientHandler}
                    disable = {disabledInfo}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;