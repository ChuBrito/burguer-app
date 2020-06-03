import * as actionsTypes from '../actions/actionsTypes';

const initialState ={
    ingredients: null,
    ingredientsPrice: null,
    totalPrice: 2,
    error: {
        status:false,
        message: null,
    }
}

const burguerReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                },
                totalPrice: state.totalPrice + state.ingredientsPrice[action.ingredientName]
            };
        case actionsTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
                },
                totalPrice: state.totalPrice - state.ingredientsPrice[action.ingredientName]
            };
        case actionsTypes.CLEAR_INGREDIENTS:
            return{
                ingredients: {
                    salad: 0,
                    bacon: 0,
                    meat: 0,
                    cheese: 0,
                },
                totalPrice: 2
            };
        case actionsTypes.GET_INGREDIENTS:
            return{
                ...state,
                ingredients: {
                    ...action.ingredients
                }
            };
        case actionsTypes.GET_PRICE:
            return{
                ...state,
                ingredientsPrice:{
                    ...action.prices
                }
            };
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error: {
                    status: true,
                    message: action.error
                }
            };
        default:
            return state;
    }
}

export default burguerReducer;