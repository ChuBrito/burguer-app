import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'

export class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0
    }

    UNSAFE_componentWillMount() {
        this.setState({ingredients: this.props.ings, price: this.props.totalPrice});
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
                    ingredients={this.props.ings} 
                    confirmClick={this.confirmOrderHandler} 
                    cancelClick={this.cancelHandler}
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout)
