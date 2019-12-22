import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 2,
            cheese: 1,
            meat: 1,
            bacon: 2
        }
    };
    render() {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients} />
                <div> Build Controls </div>
            </Aux>
        )
    }
}
export default BurgerBuilder;