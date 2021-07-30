import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Product from 'pages/Product';
import RecentList from 'pages/RecentList';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/recentList">
            <RecentList />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
