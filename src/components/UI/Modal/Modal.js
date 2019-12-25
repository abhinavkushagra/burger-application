import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

const modal = props => (
    <Aux>
        <Backdrop show={props.show} hide={props.isPurchasing} />
        <div className={styles.Modal} style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1': '0'
        }}>{props.children}</div>
    </Aux>
)
export default modal