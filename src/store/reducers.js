import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './actions'

const initial_state = {
    ingredients : null,
    totalPrice: 20
}

const reducers = (state = initial_state, actions) => {
    switch (actions.type){
        case ADD_INGREDIENT: 
            
        break
        case REMOVE_INGREDIENT:
        
        break
        default:
            return state
    }
}

export default reducers;


