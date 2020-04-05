import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import styles from './Contents.module.css'
import { connect } from 'react-redux';

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
                <Toolbar isAuth={this.props.isAuth} clicked={this.sideDrawerSwitchHandler}/>
                <SideDrawer isAuth={this.props.isAuth} show={this.state.showSideDrawer} clicked={this.sideDrawerSwitchHandler}/>
                <main className={styles.Contents} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null
    }
}

export default connect(mapStateToProps) (Layout);
