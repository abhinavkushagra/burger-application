import { PURCHASE_BURGER ,PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_BURGER_INIT, FETCH_ORDER_START, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL, FETCH_ORDER } from './actions';


export const purchaseInit = () => {
    return {
        type: PURCHASE_BURGER_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = (id, order_data) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        order_id: id,
        order_data: order_data
    } 
}

export const purchaseBurgerFail = error => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (order_data, token) => {
    return {
        type: PURCHASE_BURGER,
        order_data: order_data,
        token: token
    }
}

export const fetchOrderStart = () => {
    return {
        type: FETCH_ORDER_START
    }
}
 
export const fetchOrderSuccess = orders => {
    return {
        type: FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = error => {
    return {
        type : FETCH_ORDER_FAIL,
        error : error
        
    }
}

export const fetchOrders = (token, user_id) => {
    return{
        type: FETCH_ORDER,
        token: token,
        user_id: user_id
    }
}


