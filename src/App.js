import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import asyncComponent from './Hoc/asyncComponent/asyncComponent'
import Layout from './components/Layout/Layout';
//import CheckoutSummary from './components/Order/CheckoutSummary/CheckoutSummary';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() =>{
  return import ('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() =>{
  return import ('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() =>{
  return import ('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount(){
    this.props.reload();
  }

  render() {
    let routes =(
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" component={asyncAuth}/>
        <Redirect to="/"/>
      </Switch>
    )

    if(this.props.isAuth){
      routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/checkout" component={asyncCheckout}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/orders" component={asyncOrders}/>
            <Redirect to="/"/>
          </Switch>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuth : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    reload : ()=> dispatch(actions.authCheck())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
