import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/AsyncComponent/asyncComponent';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { checkAuthState } from './store/actions'
import { connect } from 'react-redux';
class App extends Component {
  componentDidMount() {
    this.props.onAppLoad()
  }

  render() {
    const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
    const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
    const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))

    const route = !this.props.isAuthenticated ?
      (<Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>) :
      (<Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Switch>);

    return (
      <div className="App">
        <Layout>
          {route}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAppLoad: () => dispatch(checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
