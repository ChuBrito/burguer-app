import React from 'react'
import Burguer from '../../Burger/Burger'
import StylizedButton from '../../UI/StylizedButton/StylizedButton'
import classes from './CheckoutSumary.module.css'

const checkoutSumary = props => {
    return (
        <div className={classes.CheckoutSumary}>
            <Burguer ingredients={props.ingredients}></Burguer>
            <div className={classes.ButtonWrapper}> 
                <StylizedButton btnType="Danger" onClick={props.cancelClick}> Cancel </StylizedButton> 
                <StylizedButton btnType="Success" onClick={props.confirmClick}> Confirm </StylizedButton>
            </div>
        </div>
    )
}

export default checkoutSumary
