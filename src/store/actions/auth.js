import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_RESET, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH, AUTH_INITIATE_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE } from './actions'

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authSuccess = auth_data => {
    return {
        type: AUTH_SUCCESS,
        token: auth_data.idToken,
        user_id: auth_data.localId
    }
}



export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const authReset = () => {
    return {
        type: AUTH_RESET
    }
}

export const auth = (email, password, isSignUp) => {
    return {
        type: AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
}

export const checkTimeOut = expirationTime => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expiration_time: expirationTime
    }
}

export const authLogOut = () => {
    return {
        type: AUTH_INITIATE_LOGOUT
    }
}

export const authLogoutSucceed = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return {
        type: AUTH_CHECK_STATE
    }
}
