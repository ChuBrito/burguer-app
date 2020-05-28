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
        return sum >= 1
    }

    verifyIngredientHandler = (ing) => {
        if(this.props.ings[ing] || this.props.ings[ing] > 0)
            return true;
        return false;
    }

    showOrderHandler = () => {
        this.setState({purchasing: true});
    }

    hideOrderHandler = () => {
        this.setState({purchasing: false});
    }

    completePurchaseHandler = () => {

        this.props.history.push('/checkout')
    }

    render() {
        let orderSumary = <Spinner/>
        let burger = <Spinner/>

        if( !this.state.loading && this.props.ings){
            orderSumary = <OrderSumary 
                ingredients={this.props.ings}
                totalPrice={this.props.totalPrice}
                hideOrder={this.hideOrderHandler}
                completePurchase={this.completePurchaseHandler}
            />
        }
 
        if( this.props.ings ){
            burger = <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    totalPrice={this.props.totalPrice}
                    moreHandler={this.props.onIngredientAdd}
                    lessHandler={this.props.onIngredientRemove}
                    purchasable={this.verifyPurchasebleHandler(this.props.ings)}
                    ingredientHandler={(ing) => this.verifyIngredientHandler(ing)}
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
        ings: state.ingredients,
        totalPrice: state.totalPrice
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
