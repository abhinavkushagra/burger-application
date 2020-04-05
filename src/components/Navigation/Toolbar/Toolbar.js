import React from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = props => (
    <Aux>
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.clicked}/>
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    </Aux>
)

export default toolbar;