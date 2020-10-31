import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../Hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
        totalPrice : 15,
        purchaseable : false,
        purchasing : false
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
         let ans = false;
         if(newPrice > 15)
            ans =true;
         this.setState({
             ingredients : updatedIngredients,
             totalPrice : newPrice,
             purchaseable : ans
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
         let ans = true;
         if(newPrice <= 15)
            ans =false;
         this.setState({
             ingredients : updatedIngredients,
             totalPrice : newPrice,
             purchaseable : ans
         })
    }

    purchaseHandler=()=>{
        this.setState({
            purchasing : true
        })
    }

    purchaseCancelHandler = ()=>{
        this.setState({
            purchasing:false
        })
    }

    purchaseContinueHandler=()=>{
        //alert('Successfully purchased');
        const order ={
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name: 'Naman',
                address :{
                    addressLine1 : 'west vinod nagar',
                    addressLine2 : 'New Delhi',
                    zipCode : '110092',
                },
                email : 'abc@abc.com'
            },
            Delivery : 'Take-away'
        }
        axios.post('/orders.json',order)
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
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
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        purchasedCanceled={this.purchaseCancelHandler}
                        purchasedContinued={this.purchaseContinueHandler}
                        price = {this.state.totalPrice}
                    />
                </Modal>
                <Burger 
                    ingredients={this.state.ingredients}
                    
                    />
                <BuildControls add={this.addIngredientHandler}
                    remove = {this.removeIngredientHandler}
                    disable = {disabledInfo}
                    price = {this.state.totalPrice}
                    order = {this.state.purchaseable}
                    purchasing = {this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;