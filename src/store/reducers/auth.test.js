import reducer from './auth'
import { AUTH_SUCCESS } from '../actions/actions'


describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            user_id: null,
            error: null,
            loading: false,
            auth_redirect_path: '/'
        })
    })
    it('should return the the token upon log in', () => {
        expect(reducer({
            token: null,
            user_id: null,
            error: null,
            loading: false,
            auth_redirect_path: '/'
        },
            {
                type: AUTH_SUCCESS,
                token: 'some-token',
                user_id: 'some-user-id'
            })).toEqual({
                token: 'some-token',
                user_id: 'some-user-id',
                error: null,
                loading: false,
                auth_redirect_path: '/'
            })
    })
})