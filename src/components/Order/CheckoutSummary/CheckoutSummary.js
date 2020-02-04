import React from 'react';
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.module.css'
import Burger from '../../Burger/Burger'

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                <Button btntype="Danger" clicked> Cancel </Button>
                <Button btntype="Success" clicked> Continue </Button>
            </div>
        </div>

    )
}

export default checkoutSummary;

