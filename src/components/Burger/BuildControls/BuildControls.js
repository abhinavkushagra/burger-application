import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' }
]

const BuildControls = props => (
    <div className={styles.BuildControls}>
        <p> Current Price : <strong> &#8377; {props.price.toFixed(2)} </strong> </p>
        {controls.map(control => <BuildControl key={control.label} label={control.label} 
        addIngredient={() => props.addIngredient(control.type)} 
        removeIngredient={() => props.removeIngredient(control.type)} 
        enableIngredient={props.enableIngredient[control.type]} />)}
        <button className={styles.OrderButton} disabled={!props.isPurchasable} onClick={props.isPurchasing}> {props.isAuth? 'ORDER NOW' : 'SIGN IN & ORDER'}</button>
    </div>
)

export default BuildControls;