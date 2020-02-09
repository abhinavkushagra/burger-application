import React, {Component} from 'react'
import Order  from '../../components/Order/Order'
import Axios from '../../axios-orders'
import withError from '../../hoc/ErrorHandler/ErrorHandler'

class Orders extends Component {
    state = {
        orders : [],
        loading: true
    }
    componentDidMount() {
        Axios.get('/orders.json')
        .then( response => {
            let fetched_orders = []
            for(let key in response.data){
                fetched_orders.push({
                    ...response.data[key],
                    id: key, 
                })
            }
            this.setState({loading : false, orders: fetched_orders})
        })
        .catch(error => {
            console.log(error)
            this.setState({loading: false})
        })
    }
    render() {
        return this.state.orders.map( order =>
            <Order key={order.id} ingredients={order.ingredients} total_price={+order.total_price} timestamp={order.date + " " + order.time} />
        )
    }
}

export default withError(Orders, Axios);