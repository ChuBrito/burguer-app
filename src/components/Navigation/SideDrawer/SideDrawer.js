import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItens from '../NavigationItens/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../containers/Utilities/Auxiliar'
import classes from './SideDrawer.module.css'

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer , classes.Close]
    if(props.drawerShow)
        attachedClasses = [classes.SideDrawer , classes.Open]

    return (
        <Aux>
            <Backdrop show={props.drawerShow} hideHandler={props.closeDrawer}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                
                <nav>
                    <NavigationItens>

                    </NavigationItens>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer
