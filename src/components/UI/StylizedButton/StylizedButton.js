import React from 'react'
import classes from './StylizedButton.module.css'

const stylizedButton = props => (
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.onClick}
        >
        {props.children}
    </button>
)

export default stylizedButton