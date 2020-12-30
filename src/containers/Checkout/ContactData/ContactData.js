import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {

    state ={
        orderForm:{
            
                name: {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                }, 
                addressLine1 : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Address Line 1'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                addressLine2 : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Address Line 2'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                zipCode : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'ZIP CODE'
                    },
                    value : '',
                    validation :{
                        required : true,
                        minLength : 6,
                        maxLength : 6
                    },
                    valid : false,
                    touched : false
                    
                },
                email :{
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your Email ID'
                    },
                    value : '',
                    validation :{
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                delivery :{
                    elementType : 'select',
                    elementConfig:{
                        options : [{value : 'fastest', displayValue:'Fastest'},
                                    {value : 'cheapest',displayValue : 'Cheapest'}
                                ]
                    },
                    validation :{
                        required : true
                    },
                    value : 'fastest',
                    valid : true
                }
        },
        formIsValid :false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //this.setState({loading:true});

        const formData = {};
        for(let element in this.state.orderForm){
            formData[element] = this.state.orderForm[element].value;

        }

        const order ={
            ingredients : this.props.in,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }

        this.props.onOrderBurger(order,this.props.token)
    }

    inputChangedHandler=(event,inputIdentifier)=>{
        const updated ={
            ...this.state.orderForm
        }
        const up = { ...updated[inputIdentifier] };
        
        up.value = event.target.value;
        up.valid = this.checkValidity(up.value,up.validation);
        up.touched = true;
        updated[inputIdentifier] = up;

        let formIsValid = true;
        for (let inputIdentifier in updated) {
            formIsValid = updated[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm :  updated, formIsValid : formIsValid})
    }

    checkValidity(value,rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render() {

        const formsElementsArray =[];
        for(let key in this.state.orderForm){
            formsElementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            });
        }

        let form =(
            <form onSubmit={this.orderHandler}>      
                    {
                        formsElementsArray.map(formElement =>(
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value ={formElement.config.value}
                                invalid = {!formElement.config.valid}
                                shouldValidate ={formElement.config.validation}
                                touched = {formElement.config.touched}
                                changed = {(event) => this.inputChangedHandler(event,formElement.id)}
                            />
                        ))
                    }
                    <Button btnTyp="Success" disabled={!this.state.formIsValid}>ORDER</Button>

                </form>
        );
        if(this.props.loading)
            form = <Spinner/>
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return {
        in : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}


const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));