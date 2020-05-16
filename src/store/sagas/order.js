import { put } from 'redux-saga/effects'
import Axios from '../../axios-orders'
import { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFail, fetchOrderStart, fetchOrderSuccess, fetchOrderFail } from '../actions'

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart())
    try {
        const response = yield Axios.post('/orders.json?auth=' + action.token, action.order_data)
        yield put(purchaseBurgerSuccess(response.data.name, action.order_data))
        if (response.status === 200)
            yield alert('Your delicious Burger\'s on the way')
    }
    catch (error) {
        yield put(purchaseBurgerFail(error))
    }
}

export function* fetchOrderSaga(action) {
    put(fetchOrderStart())
    const query_params = 'auth=' + action.token + '&orderBy="user_id"&equalTo="' + action.user_id + '"'
    try {
        const response = yield Axios.get('/orders.json?' + query_params)
        let fetched_orders = []
        for (let key in response.data) {
            fetched_orders.push({
                ...response.data[key],
                id: key,
            })
        }
        yield put(fetchOrderSuccess(fetched_orders))
    }

    catch (error) {
        yield put(fetchOrderFail(error))
    }
}

