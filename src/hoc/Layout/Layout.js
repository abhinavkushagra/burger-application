import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Contents.module.css'
import { connect } from 'react-redux';

const Layout = props => {

    const [show_side_drawer, setShowSideDrawer] = useState(false)
    
    const sideDrawerSwitchHandler = () => {
        setShowSideDrawer(!show_side_drawer)
    }

    return (
        <Aux>
            <Toolbar isAuth={props.isAuth} clicked={sideDrawerSwitchHandler} />
            <SideDrawer isAuth={props.isAuth} show={show_side_drawer} clicked={sideDrawerSwitchHandler} />
            <main className={styles.Contents} >
                {props.children}
            </main>
        </Aux>
    )

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);
