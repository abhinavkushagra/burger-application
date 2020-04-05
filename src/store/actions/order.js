import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAIL, PURCHASE_BURGER_START, PURCHASE_BURGER_INIT, FETCH_ORDER_START, FETCH_ORDER_SUCCESS, FETCH_ORDER_FAIL } from './actions';
import Axios from '../../axios-orders'

export const purchaseInit = () => {
    return {
        type: PURCHASE_BURGER_INIT
    }
}

const purchaseBurgerStart = () => {
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
    return dispatch => {
        dispatch(purchaseBurgerStart())
        Axios.post('/orders.json?auth=' + token, order_data)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, order_data))
                if (response.status === 200)
                    alert('Your delicious Burger\'s on the way')
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
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
    return dispatch => {
        dispatch(fetchOrderStart())
        const query_params = 'auth=' + token + '&orderBy="user_id"&equalTo="' + user_id + '"'
        Axios.get('/orders.json?' + query_params)
        .then( response => {
            let fetched_orders = []
            for(let key in response.data){
                fetched_orders.push({
                    ...response.data[key],
                    id: key, 
                })
            }
            dispatch(fetchOrderSuccess(fetched_orders))
        })
        .catch(error => {
            dispatch(fetchOrderFail(error))
        })
    }
}


