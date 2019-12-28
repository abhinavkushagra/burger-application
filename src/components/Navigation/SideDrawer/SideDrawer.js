import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../Toolbar/NavigationItems/NavigationItems'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../../UI/Backdrop/Backdrop'
import styles from './SideDrawer.module.css'

const sideDrawer = props => {
    let cssClasses = [styles.SideDrawer]
    cssClasses = props.show ? cssClasses.concat([styles.Open]) : cssClasses.concat([styles.Close])

    return (
        <Aux>
            <BackDrop show={props.show} hide={props.clicked} />
            <div className={cssClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;