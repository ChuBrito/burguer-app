import React, { Component } from 'react';
import classes from './Orders.module.css'
import Order from '../../components/Order/Order'
import axios from '../../services/axios-orders'
import withErrorHandler from '../Utilities/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        this.getOrders();

    }

    getOrders = () => {
        axios.get('https://burguer-app-676c8.firebaseio.com/orders.json')
            .then( resp => {
                console.log(resp.data);
                let ordersFetched = [];
                for (let key in resp.data) {
                    ordersFetched.push({
                        ...resp.data[key],
                            id: key
                    });
                }
                this.setState({ loading:false, orders: ordersFetched});
            })
            .catch( err => {
                console.log(err);
                this.setState({ loading:false });
            })
        
    }

    render() {
        const orders = [];
        this.state.orders.forEach(element => {
            orders.push( <Order key={element.id} ingredients={element.ingredients} price={element.price}/> );
        });

        return (
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);