import * as actionsTypes from '../actions/actions';

const initialState ={
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0,
    },
    totalPrice: 2,
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1.2,
    meat: 2.0,
    cheese: 1.0,
}

const burguerReducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case 'REMOVE_INGREDIENT':
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        case 'CLEAR_INGREDIENTS':
            return{
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    meat: 0,
                    cheese: 0,
                },
                totalPrice: 2
            };
        default:
            return state;
    }
}

export default burguerReducer;