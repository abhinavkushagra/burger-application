import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENT, FETCH_INGREDIENTS_FAILED } from '../actions/actions'
import updateState from '../../shared/utilities'

const INGREDIENTS_PRICE = {
    salad: 10,
    cheese: 15,
    meat: 30,
    bacon: 20
}

const initial_state = {
    ingredients: null,
    totalPrice: 20,
    error: false,
    building: false
}

const addIngredient = (state, actions) => {
    const update_added_ingredient = {[actions.ingredient]: state.ingredients[actions.ingredient] + 1}
            const update_added_ingredients = updateState(state.ingredients, update_added_ingredient)
            const update_added_state = { 
                ingredients: update_added_ingredients, 
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[actions.ingredient],
                building: true
            }
            return updateState(state, update_added_state)
}

const removeIngredient = (state, actions) => {
    const update_removed_ingredient = {[actions.ingredient]: state.ingredients[actions.ingredient] - 1}
    const update_removed_ingredients = updateState(state.ingredients, update_removed_ingredient)
    const update_removed_state = { 
        ingredients: update_removed_ingredients, 
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[actions.ingredient],
        building: true
    }
    return updateState(state, update_removed_state)
}

const setIngredient = (state, actions) => {
    state = initial_state
    return updateState(state, {ingredients: actions.ingredients, building: false})
}

const fetchIngredientsFailed = (state, actions) => {
    return updateState(state, { error: true })
}

const reducers = (state = initial_state, actions) => {
    switch (actions.type) {
        case ADD_INGREDIENT:
            return addIngredient(state, actions)

        case REMOVE_INGREDIENT:
            return removeIngredient(state, actions)           

        case SET_INGREDIENT:
            return setIngredient(state, actions)    

        case FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, actions)
        default:
            return state
    }
}

export default reducers;
