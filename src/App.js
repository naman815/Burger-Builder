import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Layout from './components/Layout/Layout';
//import CheckoutSummary from './components/Order/CheckoutSummary/CheckoutSummary';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount(){
    this.props.reload();
  }

  render() {
    let routes =(
      <Switch>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/auth" component={Auth}/>
        <Redirect to="/"/>
      </Switch>
    )

    if(this.props.isAuth){
      routes = (
        <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/orders" component={Orders}/>
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
