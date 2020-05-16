import Axios from '../../axios-orders'
import { put } from 'redux-saga/effects'
import {setIngredients, fetchIngredientsFailed} from '../actions'

export function* initIngredientsSaga(action) {
    try {
        const response = yield Axios.get('/ingredients.json')
        yield put(setIngredients(response.data))
    }
    catch (error) {
        yield put(fetchIngredientsFailed())
    }
} 