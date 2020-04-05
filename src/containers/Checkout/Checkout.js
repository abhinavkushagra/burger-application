import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
class Checkout extends Component{
    

    componentDidMount() {
        // const ingredients = {};
        // let price = 0;
        // const query = new URLSearchParams(this.props.location.search);

        // for(let param of query.entries()){
        //     if(param[0] === "price") {
        //         price = +param[1];
        //     }
        //     else{
        //         ingredients[param[0]] = +param[1];
        //     } 
        // }
        // this.setState({ingredients : ingredients, total_price: price})
    }

    handleCancel = () => {
        this.props.history.goBack();
    }

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/"/> 
        if (this.props.ingredients) {
            const purchased_redirect = this.props.purchased?  <Redirect to="/" /> : null
            summary = (
                <div> 
                    {purchased_redirect}
                    <CheckoutSummary ingredients={this.props.ingredients} checkOutCanceled={this.handleCancel} checkOutContinued={this.handleContinue} />
                    <Route path= {this.props.match.url + "/contact-data"} component = {ContactData} /> 
                </div>
            )
        } 
        
        return summary
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.burger_builder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);