import React from 'react';
import Aux from '../../hoc/Aux'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'
import styles from './Contents.module.css'
const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.contents} >
            <BurgerBuilder />
        </main>
    </Aux>
)

export default layout;
