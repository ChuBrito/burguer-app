import React, { Component } from 'react'

import Aux from '../Utilities/Auxiliar'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import classes from './Layout.module.css'

class Layout extends Component{ 
    state = {
        showDrawer: false
    }
    
    drawerCloseHandler = () => {
        this.setState({showDrawer:false})
    }

    drawerOpenHandler = () => {
        this.setState({showDrawer:true})
    }

    render(){
        return ( 
            <Aux>
                <Toolbar openDrawer={this.drawerOpenHandler}/>
                <main className={classes.MainConainer}>
                    {this.props.children}
                </main>
                <SideDrawer drawerShow={this.state.showDrawer} closeDrawer={this.drawerCloseHandler}/>
            </Aux>
        )
    }
}
export default Layout;