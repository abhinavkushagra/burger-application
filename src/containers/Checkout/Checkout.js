import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
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
        return (
            <div>  
                <CheckoutSummary ingredients={this.props.ingredients} checkOutCanceled={this.handleCancel} checkOutContinued={this.handleContinue} />
                <Route path= {this.props.match.url + "/contact-data"} component = {ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ingredients : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);