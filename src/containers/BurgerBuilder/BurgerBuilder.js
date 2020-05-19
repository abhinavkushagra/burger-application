import React, { useState, useEffect } from 'react'
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


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false)
    const { onInitIngredients } = props
    

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchasable = () => {  //It's without arrow function as it's not an event
        const ingredients = {
            ...props.ingredients
        }

        let sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, value) => sum + value, 0)

        return sum > 0
    }

    const handlePurchasingEvent = () => {
        if (props.isAuthenticated) {
            setPurchasing(!purchasing)
        }
        else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }

    }

    const handleContinueEvent = () => {
        props.onPurchaseInit();  //using Axios here to send POST request
        props.history.push('/checkout');
    }

        const enable_info = {
            ...props.ingredients
        }
        for (let key in enable_info) {
            enable_info[key] = enable_info[key] > 0
        }
        const burger = props.ingredients ? (
            <Aux>
                <Burger ingredients={props.ingredients} />
                <BuildControls addIngredient={props.onIngredientAdd}
                    removeIngredient={props.onIngredientRemove}
                    enableIngredient={enable_info} price={props.total_price}
                    isPurchasable={updatePurchasable}
                    isPurchasing={handlePurchasingEvent}
                    isAuth={props.isAuthenticated}
                />
            </Aux>
        ) : props.error ? <p style={{ textAlign: "center", color: "white", fontWeight: "bold" }}> The Ingredients can't be loaded </p> : <Loading />;

        const orderSummary =  props.ingredients == null ? <Loading /> : <OrderSummary ingredients={props.ingredients} clickedContinue={handleContinueEvent} clickedCancel={handlePurchasingEvent} price={props.total_price} />;

        return (
            <Aux>
                <Modal show={purchasing} clicked={handlePurchasingEvent}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
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