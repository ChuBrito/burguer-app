import React, {Component} from 'react'
import Aux from '../Utilities/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSumary from '../../components/Burger/OrderSumary/OrderSumary'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../services/axios-orders'
import withErrorHandler from '../Utilities/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1.2,
    meat: 2.0,
    cheese: 1.0,
}

class BurguerBuilder extends Component {
    state = {
        ingredients:null,
        totalPrice: 2,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        axios.get('https://burguer-app-676c8.firebaseio.com/ingredients.json').then(
            response =>{
                this.setState({ingredients: response.data})
            }    

        )
    }

    addBurguerIngredient = (type) =>{
        const currentValue = this.state.ingredients[type];
        const newValue = currentValue + 1;
        const newIngredients = {
            ...this.state.ingredients
        }
        newIngredients[type] = newValue;
        const priceToAdd = INGREDIENT_PRICE[type];
        const currentTotalPrice = this.state.totalPrice;
        const newTotalPrice = currentTotalPrice + priceToAdd;
        this.setState({totalPrice: newTotalPrice});
        this.setState({ingredients: newIngredients});
        this.verifyPurchasebleHandler(newIngredients);
    }

    removeBurguerIngredient = (type) =>{
        if(this.state.ingredients[type] > 0){
            const currentValue = this.state.ingredients[type];
            const newValue = currentValue - 1;
            const newIngredients = {
                ...this.state.ingredients
            }
            newIngredients[type] = newValue;
            const priceToAdd = INGREDIENT_PRICE[type];
            const currentTotalPrice = this.state.totalPrice;
            const newTotalPrice = currentTotalPrice - priceToAdd;
            
            this.setState({totalPrice: newTotalPrice, ingredients: newIngredients})
            this.verifyPurchasebleHandler(newIngredients);    
        }
        else{
            console.log('Without Ingredients');
        }
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

    clearOrderHandler = () => {
        this.setState({
            ingredients:{ 
                salad: 0,
                bacon: 0,
                meat: 0,
                cheese: 0,
            },
            totalPrice: 2,
            purchasable: false,
            purchasing: false
        })
    }

    render() {
        let orderSumary = <Spinner/>
        let burger = <Spinner/>

        if( !this.state.loading && this.state.ingredients){
            orderSumary = <OrderSumary 
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                hideOrder={this.hideOrderHandler}
                completePurchase={this.completePurchaseHandler}
            />
        }
 
        if(this.state.ingredients ){
            burger = <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    totalPrice={this.state.totalPrice}
                    moreHandler={this.addBurguerIngredient}
                    lessHandler={this.removeBurguerIngredient}
                    purchasable={this.state.purchasable}
                    callOrder={this.showOrderHandler}
                    clearOrder={this.clearOrderHandler}
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

export default withErrorHandler(BurguerBuilder, axios );
