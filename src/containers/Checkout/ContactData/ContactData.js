import React, { useState } from "react";
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading'
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import Axios from '../../../axios-orders';
import WithError from '../../../hoc/ErrorHandler/ErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import updateState, { checkValidity } from '../../../shared/utilities'


const ContactData = props => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const [order_form, setOrderFrom] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: 'f'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: 'f'
        },
        contact_no: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Your Contact No.'
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
                isNumeric: true
            },
            valid: 'f'
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: 'f'
        },
        zip: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                maxLength: '6',
                placeholder: 'Zip',
                isNumeric: true
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 10
            },
            valid: 'f'
        },
        delivery_method: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {

            },
            valid: true
        }
    })

    const [is_form_valid, setIsFormValid] = useState(false)

    const handleChange = (event, identifier) => {
        const updatedFormElement = updateState(order_form[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, order_form[identifier].validation)
        })

        const updatedOrderForm = updateState(order_form, {
            [identifier]: updatedFormElement
        })

        let validation = true;

        for (let key in updatedOrderForm) {
            validation = validation && updatedOrderForm[key].valid
        }
        setOrderFrom(updatedOrderForm)
        setIsFormValid(validation)
    }

    const handleOrder = event => {
        event.preventDefault();
        const date = new Date();
        const form_data = {};
        for (let form_element in order_form) {
            form_data[form_element] = order_form[form_element].value
        }
        const order_data = {
            ingredients: props.ingredients,
            total_price: props.total_price,
            contact_info: form_data,
            user_id: props.user_id,
            date: date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear(),
            time: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        }
        props.onPurchase(order_data, props.token);
    }


    const elementsArray = [];
    for (let key in order_form) {
        elementsArray.push({
            id: key,
            config: order_form[key]
        })
    }

    const form = !props.loading ? (
        < form >
            {elementsArray.map(element => (
                <Input key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    changed={event => handleChange(event, element.id)}
                    invalid={!element.config.valid}
                    needValidation={element.config.validation} />
            )
            )}
            <Button btntype="Success" disabled={!is_form_valid} clicked={handleOrder}> Order </Button>
        </form >
    ) : <Loading />;

    return (
        <div className={styles.ContactData} >
            <h3>Enter Your Contact Data! </h3>
            {form}
        </div>
    )

}

const mapStateToProps = state => {
    return {
        ingredients: state.burger_builder.ingredients,
        total_price: state.burger_builder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: (order_data, token) => dispatch(purchaseBurger(order_data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithError(ContactData, Axios));