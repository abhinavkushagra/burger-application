import { ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENT, FETCH_INGREDIENTS_FAILED, INIT_INGREDIENTS } from './actions';

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
    return {
        type: INIT_INGREDIENTS
    }
}

export const fetchIngredientsFailed = () => {
    return { type: FETCH_INGREDIENTS_FAILED }
}

