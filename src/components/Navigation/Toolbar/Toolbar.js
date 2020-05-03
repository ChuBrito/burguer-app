import React from 'react'
import classes from './Toolbar.module.css'

import Logo from '../../Logo/Logo'

const toolbar = props => (
    <header className={classes.Header}>
        <Logo/>
        <nav>...</nav>   
        <buttom>Menu</buttom>
    </header>
)

export default toolbar;
