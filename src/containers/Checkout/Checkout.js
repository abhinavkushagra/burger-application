import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component{
    state = {
        salad : 2,
        cheese: 1,
        meat: 1,
        bacon: 1
    };

    render() {
        return (
            <CheckoutSummary ingredients={this.state}/>
        )
    }
}

export default Checkout;