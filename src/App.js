import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'; 
import Auth from './containers/Auth/Auth'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

//Adding Lazy Loading
const asyncCheckout = asyncComponent(()=> {
    return import('./containers/Checkout/Checkout')
})


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={Auth} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
