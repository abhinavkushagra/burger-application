import React from 'react'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'
import styles from './Burger.module.css'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(  /* Object.keys(obj) change an object keys to an array*/
        igKey => [...Array(props.ingredients[igKey])].map(
            (_, index) => <BurgerIngredients key={igKey + index} type={igKey} /> )
        ).reduce(
           (prev, next) => {return prev.concat(next)}, []  /*Here, [] is initial value of the reducer*/
        )
    
    if(transformedIngredients.length === 0){
        transformedIngredients = <p className={styles.p}>Please start adding ingredients!</p>
    }
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    )
}

export default burger;