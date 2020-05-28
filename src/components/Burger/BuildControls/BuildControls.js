import React from 'react'
import classes from './BuildControls.module.css'
import BuildControlElemt from '../BuildControlElemt/BuildControlElemt'
import { BsTrashFill } from "react-icons/bs";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'}    
]

const BuildControls = (props) => (
    <div className={classes.BuildControlsPanel}>   
        <p><strong>Total Price:{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(
            ctrl => (
                <BuildControlElemt 
                    key={ctrl.label}
                    label={ctrl.label}
                    ingredientHandler={props.ingredientHandler(ctrl.type)}
                    moreHandler={() => props.moreHandler(ctrl.type)}
                    lessHandler={() => props.lessHandler(ctrl.type)}
                />
            )
        )}
        <div className={classes.ButtonWrapper}>
            <button 
                disabled={!props.purchasable}
                className={classes.OrderButton}
                onClick={props.callOrder} 
                >
                Checkout
            </button>
            <button 
                disabled={!props.purchasable}
                className={classes.ClearBtn}
                onClick={props.clearOrder} 
                >
                <BsTrashFill/>
            </button>
        </div>

    </div>
)

export default BuildControls;
