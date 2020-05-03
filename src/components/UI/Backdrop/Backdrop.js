import React from 'react'
import classses from './Backdrop.module.css'

const backdrop = props => (
    props.show ? <div className={classses.Backdrop} onClick={props.hideOrderHandler}></div>: null
)

export default backdrop;
