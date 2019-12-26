import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
const toolbar = props => (
    <Aux>
        <header className={styles.Toolbar}>
            <div>Menu</div>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </header>
    </Aux>
)

export default toolbar;