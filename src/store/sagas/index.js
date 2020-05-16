import { takeEvery } from 'redux-saga/effects'
import { AUTH_INITIATE_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE, INIT_INGREDIENTS, PURCHASE_BURGER, FETCH_ORDER } from '../actions/actions'
import {logoutSaga, checkTimeOutSaga, authSaga, checkAuthStateSaga} from './auth'
import {initIngredientsSaga} from './burger-builder'
import { purchaseBurgerSaga, fetchOrderSaga } from './order'

export function* watchAuth(){
    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkTimeOutSaga)
    yield takeEvery(AUTH_USER, authSaga)
    yield takeEvery(AUTH_CHECK_STATE, checkAuthStateSaga)
}

export function* watchBurgerBuilder(){
    yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder(){
    yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(FETCH_ORDER, fetchOrderSaga)
}