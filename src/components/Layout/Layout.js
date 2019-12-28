import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
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
