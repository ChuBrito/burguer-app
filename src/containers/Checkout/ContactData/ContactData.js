import React, { Component } from 'react'
import StylizedButton from '../../../components/UI/StylizedButton/StylizedButton'
import axios from '../../../services/axios-orders'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import { withRouter } from 'react-router-dom'
 
class ContactData extends Component {
    state = {
        name: "User",
        email: "E-mail",
        adress: {
            street: "Street", 
            number: "Number",
            postalcode: "Postal Code"
        },
        loading:false,
    }

    orderHandler = event =>{
        event.preventDefault();
        this.setState({loading: true})
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                id: 5545,
                name: "Felipe",
                adress: {
                    street:"Av. Taco la vida", 
                    number:170
                },
                email:"test@mail.com"
            },
            delivery:"fastest"
        }

        axios.post('/orders.json', order)
            .then( response => {
                this.setState({loading:false})
                this.props.history.push('/')
                console.log(response)
            })
            .catch(error => {
                console.log(error)
                this.setState({loading:false})
            });
    }

    render() {
        let form = (                
            <form>
                <input className={classes.Input} type="username" name="User"></input>
                <input className={classes.Input} type="email" name="E-mail"></input>
                <input className={classes.Input} type="text" name="Street"></input>
                <input className={classes.Input} type="text" name="Number"></input>
                <input className={classes.Input} type="text" name="Postal Code"></input>
                <StylizedButton onClick={this.orderHandler}>Confirmar</StylizedButton>
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