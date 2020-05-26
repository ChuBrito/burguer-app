import React from 'react';
import classes from './StylizedInputField.module.css'

const StylizedInputField = (props) => {
    let inputElement = null;
    let validationError = null;
    let inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch (props.inputType) {
        case ('input'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                onChange={props.onChange}
                value={props.value} 
                {...props.config}
                />
            break;
        case ('number'):
            inputElement = <input 
                className={inputClasses.join(' ')} 
                onChange={props.onChange}
                value={props.value}
                {...props.config}/>
              break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}>
                    {
                        props.config.options.map( options => (
                            <option key={options.value} value={options.value}>{options.displayValue}</option> 
                        ))
                    }
                </select>
            )
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} />
            break;
    }

    return (
        <div className={classes.Input} >
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default StylizedInputField;
