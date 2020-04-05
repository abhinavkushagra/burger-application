import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_RESET, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH} from './actions'
import Axios from 'axios'

export const authStart = () => {
    return{
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
    return{
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
    const auth_data = {
        email: email,
        password:password,
        returnSecureToken: true
    }
    
    const url = (isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?' : 
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?') + 'key=AIzaSyChaeTjTvSUCAT6XW9dbBfXb_puDUZm3lw'


    return dispatch => {
        dispatch(authStart())
        Axios.post(url, auth_data)
        .then( response  => {
            const expiration_date = new Date( new Date().getTime() + response.data.expiresIn * 1000 )
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expiration_date', expiration_date)
            localStorage.setItem('user_id', response.data.localId)
            dispatch(authSuccess(response.data)) 
            dispatch(checkTimeOut(response.data.expiresIn)) 
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const checkTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {dispatch(authLogOut())}, expirationTime * 1000)
    }
}

export const authLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration_date')
    localStorage.removeItem('user_id')
    return {
        type : AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    const expiration_date = new Date(localStorage.getItem('expiration_date'))
    return dispatch => {
        const token = localStorage.getItem('token')
        if(token){
            if(expiration_date > (new Date())){
                const localId = localStorage.getItem('user_id')
                const auth_data= {
                    idToken: token,
                    localId: localId
                }
                dispatch(authSuccess(auth_data))
                dispatch(checkTimeOut((expiration_date.getTime() - new Date().getTime())/1000 ))
            }
            else{
                dispatch(authLogOut())
            }
        }
        else{
            dispatch(authLogOut())
        } 
    }
}
