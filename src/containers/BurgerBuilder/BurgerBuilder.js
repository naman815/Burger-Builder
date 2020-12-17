import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger';
import Aux from '../../Hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENT_PRICES ={
    salad : 20,
    cheese : 30,
    patty : 30,
    chicken : 40
}

class BurgerBuilder extends Component {

    state={
        ingredients:null,
        totalPrice : 15,
        purchaseable : false,
        purchasing : false,
        loading : false,
        error : false
    }

   componentDidMount(){
       axios.get('https://react-my-burger-49863.firebaseio.com/ingredients.json')
       .then(response =>{
            this.setState({ingredients : response.data})
       })
       .catch(error =>{
           this.setState({error : true})
       })
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

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname :'/checkout',
            search : '?'+queryString
        })
    }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary=null;

        

        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
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
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
            purchasedCanceled={this.purchaseCancelHandler}
            purchasedContinued={this.purchaseContinueHandler}
            price = {this.state.totalPrice}/>;
        }

        if(this.state.loading){
            orderSummary  = <Spinner />
        }

        return (
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);