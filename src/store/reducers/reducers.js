import burger_builder_reducers from './burger-builder';
import order_reducers from './order'
import auth_reducers from './auth'

const reducers = {
    burger_builder: burger_builder_reducers,
    order: order_reducers,
    auth: auth_reducers
}

export default reducers;