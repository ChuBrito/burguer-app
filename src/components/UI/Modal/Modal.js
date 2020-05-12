import React from 'react'

import classes from './Modal.module.css'
import Aux from '../../../Containers/Utilities/Auxiliar'
import Backdrop from './../Backdrop/Backdrop'

const modal = props => {
    return (
        <Aux>
            <Backdrop show={props.showModal} hideHandler={props.hideHandler}/>
            <div className={!props.showModal ? [classes.Modal, classes.Hidden].join(' ') : [classes.Modal,  classes.Unhidden].join(' ')}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal;