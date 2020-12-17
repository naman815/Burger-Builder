import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        order : [],
        loading : true
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                const fetchedOrder=[]; 
                for(let key in res.data){
                    fetchedOrder.push({
                        ...res.data[key],
                        id : key
                    })
                }
                this.setState({ loading : false ,order : fetchedOrder }) 

            })
            .catch(err =>{
                this.setState({loading : false})
            })
    }

    render() {
        return (
            <div>
                {this.state.order.map(order =>{
                    return <Order key ={order.id} ingredients={order.ingredients} 
                        price = {order.price}
                    />
                })}
            </div>
        )
    }
}
export default withErrorHandler(Orders,axios);