import React from 'react'
import burgerlogo from '../../assets/images/Logo.png'
import styles from './Logo.module.css'



const Logo = props => (
    <div className={styles.Logo}>
        <img src={burgerlogo} alt="The Burger Company" />
    </div>
    
)

export default Logo;