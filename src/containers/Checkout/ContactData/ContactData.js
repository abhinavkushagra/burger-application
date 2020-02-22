import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading'
import styles from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';


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
                value: '',
                validation : {
                    required: true
                },
                valid: 'f'
            },
            email : {
                elementType : 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation : {
                    required: true
                },
                valid: 'f'
            },
            contact_no : {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Contact No.'
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 10,
                    maxLength: 10
                },
                valid: 'f'
            },
            street : {
                elementType : 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Address'
                },
                value: '',
                validation : {
                    required: true
                },
                valid: 'f'
            },
            zip : {
                elementType : 'input',
                elementConfig: {
                    type: 'number',
                    maxLength: '6',
                    placeholder: 'Zip'
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                },
                valid: 'f'
            },
            delivery_method : {
                elementType : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue: 'Fastest'},
                        {value : 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation : {

                },
                valid: true
            },
        },
        loading: false,
        isFormValid: false
    }
    checkValidity(value, rules) {
        let isValid = true

        if(rules.required){
            isValid = value.trim() !== '' 
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    handleChange = (event, identifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...this.state.orderForm[identifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedOrderForm[identifier] = updatedFormElement
        
        let isFormValid = true;
        
        for (let key in updatedOrderForm){
            isFormValid = isFormValid && updatedOrderForm[key].valid
        }

        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid})
    }
    handleOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const date = new Date();
        Axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            total_price: this.props.total_price,
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
                        <Input key={element.id} 
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        changed={event => this.handleChange(event, element.id)}
                        invalid={!element.config.valid}
                        needValidation={element.config.validation}  />
                    )
                )}
                <Button btntype="Success" disabled={!this.state.isFormValid} clicked={this.handleOrder}> Order </Button>
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

const mapStateToProps = state => {
    return{
        ingredients : state.ingredients,
        total_price : state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);