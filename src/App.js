import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/order" component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" component={BurguerBuilder} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
