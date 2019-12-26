import React from 'react';
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = props => {
    const ingredients = Object.keys(props.ingredients).map(
       igKey => props.ingredients[igKey] > 0 ? <li key={igKey}><span style = {{textTransform : 'capitalize'}}>{igKey} : </span> {props.ingredients[igKey]}</li> : ''
    )
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
               {ingredients}
            </ul>
    <p>Total Price: <strong>&#8377;{props.price.toFixed(2)} </strong></p>

            <p>Continue to Checkout?</p>
            <Button btntype="Danger" clicked={props.clickedCancel}> Cancel </Button>
            <Button btntype="Success" clicked={props.clickedContinue}> Continue </Button>
        </Aux>
    )
}

export default orderSummary;