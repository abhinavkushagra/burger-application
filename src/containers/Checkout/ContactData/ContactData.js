import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading'
import styles from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    state = {
        orderForm :{
            name : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email : {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            contact_no : {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    maxLength: '10',
                    placeholder: 'Your Contact No.'
                },
                value: ''
            },
            street : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: ''
            },
            zip : {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    maxLength: '6',
                    placeholder: 'Zip'
                },
                value: ''
            },
            delivery_method : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue: 'Fastest'},
                        {value : 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value : ''
            },
        },
        loading: false
    }
    handleChange = (event, identifier) => {
        console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...this.state.orderForm[identifier]
        }

        updatedFormElement.value = event.target.value
        
        updatedOrderForm[identifier] = updatedFormElement
        
        this.setState({ orderForm: updatedOrderForm})
    }
    handleOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const date = new Date();
        Axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            total_price: this.props.totalPrice,
            date: date.getDate() + "-" + this.months[date.getMonth() + 1] + "-" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        })
            .then(response => {
                console.log(response)
                this.setState({ loading: false })
                if (response.status === 200)
                    alert('Your delicious Burger\'s on the way')
                    this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            })
           
    }
    render() {
        const elementsArray = [];
        for(let key in this.state.orderForm){
            elementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        const form = !this.state.loading? (
            < form >
                {elementsArray.map( element => (
                        <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} changed={event => this.handleChange(event, element.id)}/>
                    )
                )}
                <Button btntype="Success" clicked={this.handleOrder}> Order </Button>
            </form >
        ) : <Loading />;
        
        return (
            <div className={styles.ContactData} >
                <h3>Enter Your Contact Data! </h3>
                {form}
            </div>
        )
    }
}

export default ContactData;