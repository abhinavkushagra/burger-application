import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Axios from '../../Orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Loading from '../../components/UI/Loading/Loading'

const INGREDIENTS_PRICE = {
    salad: 10,
    cheese: 15,
    meat: 30,
    bacon: 20
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 20,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        Axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    handleIngredientAdd = type => {
        let old_count = this.state.ingredients[type]
        let new_count = old_count + 1
        let old_price = this.state.totalPrice
        let new_price = old_price + INGREDIENTS_PRICE[type]

        let updated_ingredients = {
            ...this.state.ingredients
        }
        updated_ingredients[type] = new_count

        this.setState({
            ingredients: updated_ingredients,
            totalPrice: new_price
        }, () => this.updatePurchasable())

    }

    handleIngredientRemove = type => {
        let old_count = this.state.ingredients[type]
        let new_count = old_count - 1
        let old_price = this.state.totalPrice
        let new_price = old_price - INGREDIENTS_PRICE[type]

        let updated_ingredients = {
            ...this.state.ingredients
        }
        updated_ingredients[type] = new_count

        this.setState({
            ingredients: updated_ingredients,
            totalPrice: new_price
        }, () => this.updatePurchasable())


    }

    updatePurchasable() {  //It's without arrow function as it's not an event
        const ingredients = {
            ...this.state.ingredients
        }

        let sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, value) => sum + value, 0)
        this.setState({
            purchasable: sum > 0
        })
    }

    handlePurchasingEvent = () => {
        this.setState(prevState => ({ purchasing: !prevState.purchasing }))
    }

    handleContinueEvent = () => {  //using Axios here to send POST request
        this.setState({ loading: true })
        Axios.post('/orders.json', {
            customer: {
                name: 'Abhinav Kushagra',
                phone: '7003734561',
                address: {
                    street: '13th Baker Street',
                    zip: 800150
                },
                email: 'abhinavkushagra@gmail.com'
            },
            ingredients: this.state.ingredients,
            total_price: this.state.totalPrice
        })
            .then(response => {
                this.setState({ loading: false, purchasing: false })
                if (response.status === 200)
                    alert('Your delicious Burger\'s on the way')
            })
            .catch(error => {
                this.setState({ loading: false, purchasing: false })
            })

    }

    render() {
        const enable_info = {
            ...this.state.ingredients
        }
        for (let key in enable_info) {
            enable_info[key] = enable_info[key] > 0
        }
        const burger = this.state.ingredients ? (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls addIngredient={this.handleIngredientAdd} removeIngredient={this.handleIngredientRemove} enableIngredient={enable_info} price={this.state.totalPrice} isPurchasable={this.state.purchasable} isPurchasing={this.handlePurchasingEvent} />
            </Aux>
        ) : this.state.error ? <p style={{ textAlign: "center", color: "white", fontWeight: "bold" }}> The Ingredients can't be loaded </p> : <Loading />;
        const orderSummary = this.state.loading || this.state.ingredients == null ? <Loading /> : <OrderSummary ingredients={this.state.ingredients} clickedContinue={this.handleContinueEvent} clickedCancel={this.handlePurchasingEvent} price={this.state.totalPrice} />;

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
export default ErrorHandler(BurgerBuilder, Axios);