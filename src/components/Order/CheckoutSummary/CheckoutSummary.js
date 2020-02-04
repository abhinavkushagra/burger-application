import React from 'react';
import Button from '../../UI/Button/Button'
import styles from './CheckoutSummary.css'

const checkoutSummary = props => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100px', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
                <Button btnType="danger" clicked> Cancel </Button>
                <Button btnType="Success" clicked> Continue </Button>
            </div>
        </div>

    )
}

export default checkoutSummary;

