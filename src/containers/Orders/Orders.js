import React, {useEffect} from 'react'
import Order  from '../../components/Order/Order'
import { connect } from 'react-redux'
import Axios from '../../axios-orders'
import WithError from '../../hoc/ErrorHandler/ErrorHandler'
import { fetchOrders } from '../../store/actions/index'
import Loading from '../../components/UI/Loading/Loading'

const Orders = props => {
    const {onFetchOrders, token, user_id, loading, orders} = props
    useEffect(() => {
        onFetchOrders(token, user_id)
    }, [onFetchOrders, token, user_id]) 

    
        return loading? <Loading /> : orders.map( order =>
            <Order key={order.id} ingredients={order.ingredients} total_price={+order.total_price} timestamp={order.date + " " + order.time} />
        )
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, user_id) => dispatch(fetchOrders(token, user_id))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (WithError(Orders, Axios));