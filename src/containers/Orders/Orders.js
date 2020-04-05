import React, {Component} from 'react'
import Order  from '../../components/Order/Order'
import { connect } from 'react-redux'
import Axios from '../../axios-orders'
import WithError from '../../hoc/ErrorHandler/ErrorHandler'
import { fetchOrders } from '../../store/actions/index'
import Loading from '../../components/UI/Loading/Loading'

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.user_id)
    }
    render() {
        return this.props.loading? <Loading /> : this.props.orders.map( order =>
            <Order key={order.id} ingredients={order.ingredients} total_price={+order.total_price} timestamp={order.date + " " + order.time} />
        )
    }
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