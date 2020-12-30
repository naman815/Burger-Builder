import React, { Component } from 'react'
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render() {
        const style ={
            textAlign : "center"
        }

        let or = <Spinner/>
        if(!this.props.loading){
           if(this.props.order){
                or =  this.props.orders.map(order =>{
                    return <Order key ={order.id} ingredients={order.ingredients} 
                        price = {order.price}
                    />
                })
           }
           else{
               or = (
                   <p style={style}>No order found, Please place a new Order</p>
               )
           }
        }
        return (
            
            <div>
                {or}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders : (token,userId)=> dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));