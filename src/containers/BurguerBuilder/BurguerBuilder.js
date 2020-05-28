import React, {Component} from 'react'
import { connect } from 'react-redux'

import Aux from '../Utilities/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from '../../components/Burger/OrderSumary/OrderSumary'
import Spinner from '../../components/UI/Spinner/Spinner'

import axios from '../../services/axios-orders'
import withErrorHandler from '../Utilities/withErrorHandler'
import * as actionTypes from '../../store/actions/actions'

class BurguerBuilder extends Component {
    state = {

        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        // axios.get('https://burguer-app-676c8.firebaseio.com/ingredients.json').then(
        //     response =>{
        //         this.setState({ingredients: response.data})
        //     }    

        // )
    }


    verifyPurchasebleHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingredientsKeys => {
                return ingredients[ingredientsKeys]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum >= 1})
    }

    showOrderHandler = () => {
        this.setState({purchasing: true});
    }

    hideOrderHandler = () => {
        this.setState({purchasing: false});
    }

    completePurchaseHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURI(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString =queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        })
        console.log(queryString);
    }

    render() {
        let orderSumary = <Spinner/>
        let burger = <Spinner/>

        if( !this.state.loading && this.props.ings){
            orderSumary = <OrderSumary 
                ingredients={this.props.ings}
                totalPrice={this.state.totalPrice}
                hideOrder={this.hideOrderHandler}
                completePurchase={this.completePurchaseHandler}
            />
        }
 
        if( this.props.ings ){
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    totalPrice={this.state.totalPrice}
                    moreHandler={this.props.onIngredientAdd}
                    lessHandler={this.props.onIngredientRemove}
                    purchasable={this.state.purchasable}
                    callOrder={this.showOrderHandler}
                    clearOrder={this.props.onIgredientsClear}
                />
            </Aux>
        }

        return (
            <Aux>
                <Modal showModal={this.state.purchasing} hideHandler={this.hideOrderHandler}>
                {orderSumary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdd: (ingName ) => dispatch({
            type: actionTypes.ADD_INGREDIENT, 
            ingredientName: ingName
        }),
        onIngredientRemove: (ingName ) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT, 
            ingredientName: ingName
        }),
        onIgredientsClear: () => dispatch({type: actionTypes.CLEAR_INGREDIENTS})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios ));
