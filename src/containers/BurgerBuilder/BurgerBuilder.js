import React, { Component } from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import Aux from '../../Hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import  * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {

    state={
        
        purchasing : false,
        
    }

   componentDidMount(){
    this.props.onInit();
   }


    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        })
        .reduce((sum,el) =>{
            return sum+el;
        },0);

        return sum >0;
    }

    purchaseHandler=()=>{
        if(this.props.isAuth){
            this.setState({
                purchasing : true
            })
        }
        else{
            this.props.onSetAuth('/checkout')
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = ()=>{
        this.setState({
            purchasing:false
        })
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo ={
            ...this.props.in
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary=null;

        

        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner/>;

        if(this.props.in){
            burger = (
                <Aux>
                    <Burger 
                        ingredients={this.props.in}
                        
                        />
                    <BuildControls add={this.props.add}
                        remove = {this.props.remove}
                        disable = {disabledInfo}
                        price = {this.props.price}
                        order = {this.updatePurchaseState(this.props.in)}
                        purchasing = {this.purchaseHandler}
                        isAuth = {this.props.isAuth}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.in} 
            purchasedCanceled={this.purchaseCancelHandler}
            purchasedContinued={this.purchaseContinueHandler}
            price = {this.props.price}/>;
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

const mapStateToProps = state =>{
    return {
        in : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuth : state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        add : (name) =>dispatch(burgerBuilderActions.addIngredient(name)),
        remove : (name) =>dispatch(burgerBuilderActions.removeIngredient(name)),
        onInit : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : () => {dispatch(burgerBuilderActions.purchaseInit())},
        onSetAuth : (path) => dispatch(burgerBuilderActions.setAuth(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));