import React, { memo } from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import styles from './Modal.module.css'

const Modal = props => {
    // shouldComponentUpdate(nextProps, nextState) {
    //    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }


    return (
        <Aux>
            <Backdrop show={props.show} hide={props.clicked} />
            <div className={styles.Modal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>{props.children}</div>
        </Aux>
    )

}

export default memo(Modal, (prev_props, next_props) => prev_props.show === next_props.show && prev_props.children === next_props.children)