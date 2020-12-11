import React, { Component } from 'react';
import {Route , Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'



class App extends Component {
  // This state was just used to test the didMount
  state = {
    show : true
  }

  //This will cause the burgerbuilder component to disAPPER after 5 seconds 
  // componentDidMount (){
  //   setTimeout(() =>{
  //     this.setState({show : false})
  //   },5000)
  // }

  render () {
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null}  */}
          <Switch>
            
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout> 
      </div>
    );
  }
}

export default App;
