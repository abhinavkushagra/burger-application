import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading'
import styles from './ContactData.module.css';
import Axios from '../../../axios-orders';

class ContactData extends Component {
    months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    state = {
        name: '',
        email: '',
        contact_no: 0,
        address: {
            street: '',
            zip: 0
        },
        loading: false,
    }
    handleOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const date = new Date();
        Axios.post('/orders.json', {
            customer: {
                name: 'Abhinav Kushagra',
                email: 'abhinavkushagra@gmail.com',
                contact_no: 7003734561,
                address: {
                    street: '13th Baker Street',
                    zip: 800150
                },
            },
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
        const form = !this.state.loading? (
            < form >
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="email" name="email" placeholder="Your Email" />
                <input className={styles.Input} type="number" maxLength="10" name="contact-no" placeholder="Your Contact Number" />
                <input className={styles.Input} type="text" name="street" placeholder="Street Address I" />
                <input className={styles.Input} type="number" maxLength="6" name="zip-code" placeholder="Your Zip" />
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