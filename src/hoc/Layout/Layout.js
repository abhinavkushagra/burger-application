import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Contents.module.css'

class Layout extends Component {
    state = {
        showSideDrawer : false
    }
    sideDrawerSwitchHandler = () => {
        this.setState(prevState => ({showSideDrawer : !prevState.showSideDrawer}))
    }
    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerSwitchHandler}/>
                <SideDrawer show={this.state.showSideDrawer} clicked={this.sideDrawerSwitchHandler}/>
                <main className={styles.Contents} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
