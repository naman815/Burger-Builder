import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../Hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer : false
    }
    closeHandler=()=>{
        this.setState({
            showSideDrawer: false
        })
    }

    toggle=()=>{
        this.setState((prevState)=>{
            return {showSideDrawer : !prevState.showSideDrawer};
        });
    }

    render(){
    
        return(
        <Aux>
            
            <Toolbar
            isAuth={this.props.isAuth}
            clicked={this.toggle}/>
            <SideDrawer 
            isAuth = {this.props.isAuth}
            open = {this.state.showSideDrawer}
            close={this.closeHandler}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    } 
}

const mapStateToProps = state =>{
    return {
        isAuth : state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);