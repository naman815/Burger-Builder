import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {

    state = {
        controls :{
            email: {
                elementType : 'input',
                elementConfig:{
                    type : 'email',
                    placeholder : 'Email Address'
                },
                value : '',
                validation :{
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password: {
                elementType : 'input',
                elementConfig:{
                    type : 'password',
                    placeholder : 'Password'
                },
                value : '',
                validation :{
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            }
        },
        isSignup : true
    }

    componentDidMount(){
        if(!this.props.building && this.props.authRedirect){
            this.props.onSetAuth();
        }
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
        if(rules.isEmail){
            const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            isValid = pattern.test(value) && isValid
        }
        
        
        return isValid;
    }

    inputChangedHandler = (event,controlName) =>{
        const updateControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true
            }
        };
        this.setState({controls : updateControls})
    }
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return {isSignup :!prevState.isSignup}
        })
    }

    render() {
        const formsElementsArray =[];
        for(let key in this.state.controls){
            formsElementsArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }

        let form = formsElementsArray.map(formElement =>{
            return(
            <Input 
                key = {formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value ={formElement.config.value}
                invalid = {!formElement.config.valid}
                shouldValidate ={formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event,formElement.id)}
            />
            )
        })
        if(this.props.loading)
        form = <Spinner/>

        let errorMsg = null;

        if(this.props.error){
            errorMsg =(
                <p>{this.props.error.message}</p>
            )
        }

        if(this.props.isAuth){

        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirect}/>
        }
        return (
            <div className ={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnTyp = "Success">SUBMIT</Button>
                </form>
                <Button btnTyp="Danger" clicked = {this.switchAuthModeHandler}>{this.state.isSignup ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !== null,
        building : state.burgerBuilder.building,
        authRedirect : state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password,isSignup) => dispatch(action.auth(email,password,isSignup)),
        onSetAuth : () => dispatch(action.setAuth('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);