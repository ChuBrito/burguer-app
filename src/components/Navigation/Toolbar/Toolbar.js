import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItens/NavigationItems'
import Logo from '../../Logo/Logo'
import { MdMenu } from "react-icons/md";

const toolbar = props => (
    <header className={classes.Header}>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}> 
            <NavigationItems/>
        </nav>   
        <buttom onClick={props.openDrawer} className={classes.MobileOnly}>
            <MdMenu className={classes.IconMenu}/>
        </buttom>
    </header>
)

export default toolbar;
