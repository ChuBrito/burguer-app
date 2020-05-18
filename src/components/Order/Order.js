import React from 'react';
import classes from './Order.module.css'

const order = (props) => {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push(<p key={key}>{key.toString()}({props.ingredients[key]})</p>);
    }
    return (
            <div className={classes.Order}>
                {ingredients}
                <p>Price: <strong>{props.price}</strong></p>
            </div>
    );
}

export default order;