import React from 'react'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import styles from './Burger.module.css'

const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(
        igKey => [...Array(props.ingredients[igKey])].map(
            (_, index) => <BurgerIngredients key={igKey + index} type={igKey} /> )
        )

    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;