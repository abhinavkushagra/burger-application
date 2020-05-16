import { authLogoutSucceed, authLogOut, authSuccess, authFail, checkTimeOut, authStart } from '../actions/'
import { put, delay } from 'redux-saga/effects'
import Axios from 'axios'

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expiration_date')
    yield localStorage.removeItem('user_id')
    yield put(authLogoutSucceed())
}

export function* checkTimeOutSaga(action) {
    yield delay(action.expiration_time * 1000)
    yield put(authLogOut())
}

export function* authSaga(action) {
    yield put(authStart())

    const auth_data = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    try {
        const url = (action.isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' :
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?') + 'key=AIzaSyChaeTjTvSUCAT6XW9dbBfXb_puDUZm3lw'
        const response = yield Axios.post(url, auth_data)
        const expiration_date = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('expiration_date', expiration_date)
        yield localStorage.setItem('user_id', response.data.localId)
        yield put(authSuccess(response.data))
        yield put(checkTimeOut(response.data.expiresIn))
    }

    catch (error) {
        yield put(authFail(error.response.data.error))
    }
}

export function* checkAuthStateSaga(action) {
    const expiration_date = yield new Date(localStorage.getItem('expiration_date'))

    const token = yield localStorage.getItem('token')
    if (token) {
        if (expiration_date > (new Date())) {
            const localId = yield localStorage.getItem('user_id')
            const auth_data = {
                idToken: token,
                localId: localId
            }
            yield put(authSuccess(auth_data))
            yield put(checkTimeOut((expiration_date.getTime() - new Date().getTime()) / 1000))
        }
        else {
            yield put(authLogOut())
        }
    }
    else {
        yield put(authLogOut())
    }
}


