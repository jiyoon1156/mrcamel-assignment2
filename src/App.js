import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Product from 'pages/Product';
import RecentList from 'pages/RecentList/RecentList';
import GlobalNavbar from 'components/GlobalNavbar';
import GlobalStyles from 'styles/GlobalStyles';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <GlobalStyles />
          <GlobalNavbar />
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
}

export default App;
