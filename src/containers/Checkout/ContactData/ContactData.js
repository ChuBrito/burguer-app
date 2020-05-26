import React, { Component } from 'react'
import classes from './ContactData.module.css'

import StylizedButton from '../../../components/UI/StylizedButton/StylizedButton'
import StylizedInputField from '../../../components/UI/StylizedInputField/StylizedInputField'

import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../services/axios-orders'
import { withRouter } from 'react-router-dom'
 
class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name'
                },
                validation:{
                    required: true,
                    min: 3
                },
                valid: false,
                touched: false,
                value: ''
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:'Your E-mail'
                },
                validation:{
                    required: true,
                    min: 3
                },
                valid: false,
                touched: false,
                value: ''
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Street'
                },
                validation:{
                    required: true,
                    min: 3
                },
                valid: false,
                touched: false,
                value: ''
            },
            adressnumber:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'111',
                    max: '9999'
                },
                validation:{
                    required: true,
                    min: 1,
                    max: 6
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'99999-999'
                },
                validation:{
                    required: true,
                    min: 9,
                    max: 9
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliverMethod:{
                elementType: 'select',
                elementConfig: {                    
                    options: [
                        {value: 'fastest',  displayValue: 'Fastest'},
                        {value: 'normal',  displayValue: 'Normal'},
                        {value: 'cheapest',  displayValue: 'Cheapest'}
                    ]
                },
                valid: true,
                value: 'fastest'
            },
        },
        loading: false,
        formIsValid: true
    }

    onChangeHandler = (event, id) => {
        let updatedForm = {
            ...this.state.orderForm
        }
        let updatedFormElement = { 
            ...updatedForm[id]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.validateField(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[id] = updatedFormElement;
        let fomrIsValid = true;
        for(let validationKey in updatedForm){
            fomrIsValid = updatedForm[validationKey].valid && fomrIsValid
        }
        this.setState(
            {orderForm: updatedForm, fomrIsValid: fomrIsValid}
        )

    }

    validateField(value, rules) {
        let isValid = true;

        if (isValid && rules.required) {
            isValid = value.trim !== '';
        }
        if (isValid && rules.min) {
            isValid = value.length >= rules.min
        }
        if (isValid && rules.max) {
            isValid = value.length <= rules.max
        }
        return isValid;
    }
   
    orderHandler = event =>{
        event.preventDefault();
        this.setState({loading: true})
        const contactData = {}

        for(let el in this.state.orderForm){
            contactData[el] = this.state.orderForm[el].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: contactData
        }

        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading:false})
                this.props.history.push('/')
            })
            .catch(error => {
                console.error(error)
                this.setState({loading:false})
            });
    }

    render() {
        const formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({
                id: key,
                type: this.state.orderForm[key].elementType,
                config: this.state.orderForm[key].elementConfig,
                validation: this.state.orderForm[key].validation,
                valid: this.state.orderForm[key].valid,
                touched: this.state.orderForm[key].touched,
                value: this.state.orderForm[key].value
            })
        }

        let form = (          
            <form onSubmit={this.orderHandler}>
                {
                    formArray.map( element => (
                        <StylizedInputField 
                            key={element.id} 
                            inputType={element.type} 
                            label={element.id} 
                            config={element.config} 
                            value={element.value}
                            invalid={!element.valid}
                            shouldValidate={element.validation}
                            touched={element.touched}
                            onChange={(event) => this.onChangeHandler(event, element.id)}
                        />
                    ))
                }
                <StylizedButton btnType="Success" disabled={this.state.formIsValid} >Confirmar</StylizedButton>
            </form>
        )
        
        if(this.state.loading)
            form= (<Spinner />)

        return (
            <div className={classes.ContactData}>
                <h3>Contact Data</h3>
                {form}
            </div>
        )
    }
}

export default withRouter(ContactData)