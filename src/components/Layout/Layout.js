import React from 'react'
import Aux from '../Utilities/Auxiliar'
import Toolbar from './../Navigation/Toolbar/Toolbar'

import classes from './Layout.module.css'

const layout = (props) => ( 
    <Aux>
        <Toolbar/>
        <main className={classes.MainConainer}>
            {props.children}
        </main>
    </Aux>
);

export default layout;