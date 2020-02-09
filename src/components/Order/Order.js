import React from 'react';
import styles from './Order.module.css'

const Order = props => {
    const ingredients = [];

    for(let ig_name in props.ingredients){
        ingredients.push({
            name : ig_name,
            quantity:  props.ingredients[ig_name]
        })
    }

    const ig_output = ingredients.map( item => (
        <span style={{
            display:'inline-block',
            margin: '0 8px',
            padding: '5px',
            textTransform: 'capitalize',
            border: '1px solid #eee'
        }} key={item.name}> {item.name} [{item.quantity}] </span>
    ))

    return (
        <div className={styles.Order}>
            
            <p> Ingredients : {ig_output} </p>
            <p> Total Price: <strong>INR {props.total_price.toFixed(2)}</strong> <span style={{float: 'right'}}> {props.timestamp} </span></p>
            
            
        </div>
    )
}


export default Order;

