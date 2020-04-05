import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_BURGER_INIT, FETCH_ORDER_START, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from '../actions/actions'
import updateState from '../../shared/utilities'
const initialState = {
    orders: [],
    loading : false,
    purchased: false
};

const purchaseBurgerInit = (state, action) => {
    return updateState(state, {purchased: false})
}

const purchaseBurgerStart = (state, action) => {
    return updateState(state, {loading: true})
}

const purchaseBurgerSuccess = (state, action) => {
    return updateState(state, {loading: false, purchased: true})
}

const purchaseBurgerFail = (state, action) => {
    return updateState(state, {loading: false})
}

const fetchOrderStart = (state, action) => {
    return updateState(state, {loading: true})
}

const fetchOrderSuccess = (state, action) => {
    return updateState(state, {orders: action.orders, loading: false})
}

const fetchOrderFail = (state, action) => {
    return updateState(state, {loading: false})
}

 const reducer = (state = initialState, action) => {
    switch(action.type) {
        case PURCHASE_BURGER_INIT: 
            return purchaseBurgerInit(state, action)
        case PURCHASE_BURGER_START: 
            return purchaseBurgerStart(state, action)
        case PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action)
        case PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action)
        case FETCH_ORDER_START:
            return fetchOrderStart(state, action)
        case FETCH_ORDER_SUCCESS: 
            return fetchOrderSuccess(state, action)
        case FETCH_ORDER_FAIL: 
            return fetchOrderFail(state, action)
        default:
            return state
    }
}
export default reducer;