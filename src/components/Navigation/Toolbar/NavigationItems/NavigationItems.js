import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact> Burger Builder </NavigationItem>
        {props.isAuth ?
            <NavigationItem link="/orders"> Orders </NavigationItem> :
            null
        }
        {!props.isAuth ?
            <NavigationItem link="/auth"> Authenticate </NavigationItem> :
            <NavigationItem link="/logout"> Log Out </NavigationItem>
        }
    </ul>
)

export default navigationItems;