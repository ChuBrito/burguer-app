import React from 'react'
import classes from './BuildControlElemt.module.css'
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
const buildControlElemt = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <div className={classes.ButtonWraper}>
                <button className={classes.More} onClick={ props.moreHandler}> 
                    <FiPlusCircle/>
                </button>
                <button className={classes.Less} onClick={ props.lessHandler}> 
                    <FiMinusCircle/>
                </button>
            </div>
        </div>
    )
}

export default buildControlElemt
