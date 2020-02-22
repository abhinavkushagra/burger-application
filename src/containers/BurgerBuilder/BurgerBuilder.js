import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_INGREDIENT } from '../../store/actions'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import Loading from '../../components/UI/Loading/Loading'


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.props.onRefresh();
        // Axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    handleIngredientAdd = type => {
        // let old_count = this.state.ingredients[type]
        // let new_count = old_count + 1
        // let old_price = this.state.totalPrice
        // let new_price = old_price + INGREDIENTS_PRICE[type]

        // let updated_ingredients = {
        //     ...this.state.ingredients
        // }
        // updated_ingredients[type] = new_count

        // this.setState({
        //     ingredients: updated_ingredients,
        //     totalPrice: new_price
        // }, () => this.updatePurchasable())

    }

    handleIngredientRemove = type => {
        // let old_count = this.state.ingredients[type]
        // let new_count = old_count - 1
        // let old_price = this.state.totalPrice
        // let new_price = old_price - INGREDIENTS_PRICE[type]

        // let updated_ingredients = {
        //     ...this.state.ingredients
        // }
        // updated_ingredients[type] = new_count

        // this.setState({
        //     ingredients: updated_ingredients,
        //     totalPrice: new_price
        // }, () => this.updatePurchasable())


    }

    updatePurchasable() {  //It's without arrow function as it's not an event
        const ingredients = {
            ...this.props.ingredients
        }

        let sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, value) => sum + value, 0)
        
        return sum > 0
    }

    handlePurchasingEvent = () => {
        this.setState(prevState => ({ purchasing: !prevState.purchasing }))
    }

    handleContinueEvent = () => {  //using Axios here to send POST request
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
                <BuildControls addIngredient={this.props.onIngredientAdd} removeIngredient={this.props.onIngredientRemove} 
                enableIngredient={enable_info} price={this.props.total_price} isPurchasable={this.updatePurchasable()} 
                isPurchasing={this.handlePurchasingEvent} />
            </Aux>
        ) : this.state.error ? <p style={{ textAlign: "center", color: "white", fontWeight: "bold" }}> The Ingredients can't be loaded </p> : <Loading />;
        
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
        ingredients : state.ingredients, 
        total_price : state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd : ingredient => dispatch({ type: ADD_INGREDIENT, ingredient: ingredient }),
        onIngredientRemove : ingredient => dispatch({ type: REMOVE_INGREDIENT, ingredient: ingredient}),
        onRefresh : () => dispatch({type: RESET_INGREDIENT})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, Axios));