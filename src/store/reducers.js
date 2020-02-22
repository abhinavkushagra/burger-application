import { ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_INGREDIENT } from './actions'

const INGREDIENTS_PRICE = {
    salad: 10,
    cheese: 15,
    meat: 30,
    bacon: 20
}

const initial_state = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 20
}

const reducers = (state = initial_state, actions) => {
    switch (actions.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredient]: state.ingredients[actions.ingredient] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[actions.ingredient]
            }
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [actions.ingredient]: state.ingredients[actions.ingredient] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[actions.ingredient]
            }
        case RESET_INGREDIENT:
            return initial_state
        default:
            return state
    }
}

export default reducers;


