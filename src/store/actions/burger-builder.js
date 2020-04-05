import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENT, FETCH_INGREDIENTS_FAILED } from './actions';
import Axios from '../../axios-orders'

export const addIngredient = ig_name => {
    return {
        type: ADD_INGREDIENT,
        ingredient: ig_name
    }
};

export const removeIngredient = ig_name => {
    return {
        type: REMOVE_INGREDIENT,
        ingredient: ig_name
    }
}

export const setIngredients = ingredients => {
    return {
        type: SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        Axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}

export const fetchIngredientsFailed = () => {
    return { type: FETCH_INGREDIENTS_FAILED }
}

