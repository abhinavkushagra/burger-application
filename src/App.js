import React, { useEffect, lazy, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { checkAuthState } from './store/actions'
import { connect } from 'react-redux';

const App = props => {  
  
  const { onAppLoad } = props
  
  useEffect(() => {
    onAppLoad()
  }, [onAppLoad]) 
  const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
  const Orders = lazy(() => import('./containers/Orders/Orders'))
  const Auth = lazy(() => import('./containers/Auth/Auth'))

  const route = !props.isAuthenticated ?
    (<Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>) :
    (<Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>);

  return (
    <div className="App">
      <Layout>
        <Suspense fallback = {<p> Loading... </p>}> {route} </Suspense>
      </Layout>
    </div>
  )

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
