import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
const Checkout = props =>{

    const handleCancel = () => {
        props.history.goBack();
    }

    const handleContinue = () => {
        props.history.replace('/checkout/contact-data')
    }

    
        let summary = <Redirect to="/"/> 
        if (props.ingredients) {
            const purchased_redirect = props.purchased?  <Redirect to="/" /> : null
            summary = (
                <div> 
                    {purchased_redirect}
                    <CheckoutSummary ingredients={props.ingredients} checkOutCanceled={handleCancel} checkOutContinued={handleContinue} />
                    <Route path= {props.match.url + "/contact-data"} component = {ContactData} /> 
                </div>
            )
        } 
        
        return summary
}

const mapStateToProps = state => {
    return{
        ingredients : state.burger_builder.ingredients,
        purchased : state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);