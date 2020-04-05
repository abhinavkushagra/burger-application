import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_RESET, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actions'
import updateState from '../../shared/utilities'

const initial_state = {
    token: null,
    user_id: null,
    error: null,
    loading: false,
    auth_redirect_path: '/'
}

const authStart = (state, action) => {
    return updateState(state, { error: null, loading: true})
}

const authSuccess = (state, action) => {
    return updateState(state, {token: action.token, user_id: action.user_id, error: null, loading: false})
}

const authFail = (state, action) => {
    return updateState(state, {error: action.error, loading: false})
}

const authReset = (state, action) => {
    return updateState(state, initial_state)
} 

const setAuthRedirectPath = (state, action) => {
    return updateState(state, {auth_redirect_path: action.path})
}


const reducers = (state = initial_state, action) => {
    switch(action.type){
        case AUTH_START:
            return authStart(state, action)
        case AUTH_SUCCESS:
            return authSuccess(state, action)
        case AUTH_FAIL:
            return authFail(state, action)
        case AUTH_RESET:
            return authReset(state, action)
        case AUTH_LOGOUT:
            return authReset(state, action)
        case SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default reducers
