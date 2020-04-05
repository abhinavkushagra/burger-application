import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addIngredient, removeIngredient, initIngredients, purchaseInit, setAuthRedirectPath } from '../../store/actions/'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Loading from '../../components/UI/Loading/Loading'


export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasable() {  //It's without arrow function as it's not an event
        const ingredients = {
            ...this.props.ingredients
        }

        let sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, value) => sum + value, 0)

        return sum > 0
    }

    handlePurchasingEvent = () => {
        if (this.props.isAuthenticated) {
            this.setState(prevState => ({ purchasing: !prevState.purchasing }))
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }

    }

    handleContinueEvent = () => {
        this.props.onPurchaseInit();  //using Axios here to send POST request
        this.props.history.push('/checkout');
    }

    render() {
        const enable_info = {
            ...this.props.ingredients
        }
        for (let key in enable_info) {
            enable_info[key] = enable_info[key] > 0
        }
        const burger = this.props.ingredients ? (
            <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls addIngredient={this.props.onIngredientAdd}
                    removeIngredient={this.props.onIngredientRemove}
                    enableIngredient={enable_info} price={this.props.total_price}
                    isPurchasable={this.updatePurchasable()}
                    isPurchasing={this.handlePurchasingEvent}
                    isAuth={this.props.isAuthenticated}
                />
            </Aux>
        ) : this.props.error ? <p style={{ textAlign: "center", color: "white", fontWeight: "bold" }}> The Ingredients can't be loaded </p> : <Loading />;

        const orderSummary = this.state.loading || this.props.ingredients == null ? <Loading /> : <OrderSummary ingredients={this.props.ingredients} clickedContinue={this.handleContinueEvent} clickedCancel={this.handlePurchasingEvent} price={this.props.total_price} />;

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.handlePurchasingEvent}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger_builder.ingredients,
        total_price: state.burger_builder.totalPrice,
        error: state.burger_builder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: ingredient => dispatch(addIngredient(ingredient)),
        onIngredientRemove: ingredient => dispatch(removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(initIngredients()),
        onPurchaseInit: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, Axios));