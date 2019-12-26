import React from 'react';
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import styles from './Contents.module.css'
const layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={styles.Contents} >
            {props.children}
        </main>
    </Aux>
)

export default layout;
