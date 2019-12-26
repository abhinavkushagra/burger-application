import React from 'react';
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import styles from './Contents.module.css'

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={styles.Contents} >
            {props.children}
        </main>
    </Aux>
)

export default layout;
