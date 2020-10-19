import React, {Component} from 'react';
import Aux from '../../Hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer : true
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
            
            <Toolbar clicked={this.toggle}/>
            <SideDrawer 
            open = {this.state.showSideDrawer}
            close={this.closeHandler}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    } 
}
export default Layout;