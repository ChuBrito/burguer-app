import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItens = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burguer Builder</NavigationItem>
        <NavigationItem link="/order" >Orders</NavigationItem>
    </ul>
)

export default navigationItens