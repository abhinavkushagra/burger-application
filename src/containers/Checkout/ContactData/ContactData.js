import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading'
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import Axios from '../../../axios-orders';
import WithError from '../../../hoc/ErrorHandler/ErrorHandler';
import {purchaseBurger} from '../../../store/actions/index';
import updateState, { checkValidity } from '../../../shared/utilities'


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
                    required: true,
                    isEmail: true
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
                    maxLength: 10,
                    isNumeric: true
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
                    placeholder: 'Zip',
                    isNumeric: true
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
                value: 'fastest',
                validation : {

                },
                valid: true
            },
        },
        isFormValid: false
    }
    
    handleChange = (event, identifier) => {
        const updatedFormElement = updateState( this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation) 
        })
        
        const updatedOrderForm = updateState( this.state.orderForm, {
            [identifier]: updatedFormElement
        })
        
        let isFormValid = true;
        
        for (let key in updatedOrderForm){
            isFormValid = isFormValid && updatedOrderForm[key].valid
        }

        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid})
    }

    handleOrder = (event) => {
        event.preventDefault();
        const date = new Date();
        const form_data = {};
        for(let form_element in this.state.orderForm){
            form_data[form_element] = this.state.orderForm[form_element].value
        }
        const order_data =  {
            ingredients: this.props.ingredients,
            total_price: this.props.total_price,
            contact_info: form_data,
            user_id: this.props.user_id,
            date: date.getDate() + "-" + this.months[date.getMonth() + 1] + "-" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        this.props.onPurchase(order_data, this.props.token); 
    }

    render() {
        const elementsArray = [];
        for(let key in this.state.orderForm){
            elementsArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        
        const form = !this.props.loading? (
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
        ingredients : state.burger_builder.ingredients,
        total_price : state.burger_builder.totalPrice,
        loading : state.order.loading,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onPurchase : (order_data, token) => dispatch(purchaseBurger(order_data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (WithError(ContactData, Axios));