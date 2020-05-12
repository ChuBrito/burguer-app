import React from 'react'

import Aux from '../../../Containers/Utilities/Auxiliar'
import classes from './OderSumary.module.css'
import StylizedButton from './../../UI/StylizedButton/StylizedButton'

const orderSumary = (props) => {
    const ingredientSumary = Object.keys(props.ingredients)
        .map( ingredientKey => {
            return (
                <li key= {ingredientKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {ingredientKey}
                    </span>
                    : {props.ingredients[ingredientKey]}
                </li>
            );
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>{ingredientSumary}</ul>
            <p>Total Price: {props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout?</p>
            <div className={classes.ButtonsWrapper}>
                    <StylizedButton onClick={props.completePurchase} btnType={'Success'}>Yes</StylizedButton>
                    <StylizedButton onClick={props.hideOrder} btnType={'Danger'}>No</StylizedButton>
            </div>
        </Aux>
    )
}

export default orderSumary;