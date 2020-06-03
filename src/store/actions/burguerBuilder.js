import * as actionTypes from './actionsTypes';

export const addIngredient = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

export const clearIngredients = () => {
    return{
        type: actionTypes.CLEAR_INGREDIENTS,
    }
}

export const updateIngredients = (ings) => {
    return{
        type: actionTypes.GET_INGREDIENTS,
        ingredients: ings
    }
}

export const updatePrices = (prices) => {
    return{
        type: actionTypes.GET_PRICE,
        prices: prices
    }
}

export const errorHandler = (error) => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

