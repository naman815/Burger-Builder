import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux';
//import ChechoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//import * as actionTypes from '../../store/actions/order';

class Checkout extends Component {
    


    checkoutCancel=()=>{
        this.props.history.goBack();
    }

    checkoutContinue=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        
        if(this.props.in){
            const redirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {redirect}
                    <CheckoutSummary 
                    ingredients={this.props.in} 
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}
                    />
                    <Route path={this.props.match.path+'/contact-data'} 
                    component = {ContactData}
                    />
                 </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return {
        in : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);