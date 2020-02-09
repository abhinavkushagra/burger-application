import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends Component{
    state = {
        ingredients: {},
        total_price: 0
    };

    componentDidMount() {
        const ingredients = {};
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);

        for(let param of query.entries()){
            if(param[0] === "price") {
                price = +param[1];
            }
            else{
                ingredients[param[0]] = +param[1];
            } 
        }
        this.setState({ingredients : ingredients, total_price: price})
        console.log(this.state.ingredients)
    }

    handleCancel = () => {
        this.props.history.goBack();
    }

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    
    
    render() {
        return (
            <div>  
                <CheckoutSummary ingredients={this.state.ingredients} checkOutCanceled={this.handleCancel} checkOutContinued={this.handleContinue} />
                <Route path= {this.props.match.url + "/contact-data"} render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.total_price} {...props}/>} />
            </div>
        )
    }
}

export default Checkout;