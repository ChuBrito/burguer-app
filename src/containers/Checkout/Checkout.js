import React, { Component } from 'react'
import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'
import { Route } from 'react-router'

export class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const paramsIngredients = {}
        let paramsPrice = 0
        for (let param of query.entries()){
            if(param[0] === 'price'){
                paramsPrice = param[1];
            }else{
                paramsIngredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients:paramsIngredients, price: paramsPrice});
        console.log(this.props.history)
    }
    cancelHandler = () => {
        this.props.history.goBack()
    }

    confirmOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSumary 
                    ingredients={this.state.ingredients} 
                    confirmClick={this.confirmOrderHandler} 
                    cancelClick={this.cancelHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    render={() => (
                        <ContactData 
                            ingredients={this.state.ingredients} 
                            totalprice={this.state.price}
                        />
                    )}
                />
            </div>
        )
    }
}

export default Checkout
