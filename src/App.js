import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Product from 'pages/Product';
import RecentList from 'pages/RecentList/RecentList';
import GlobalNavbar from 'components/GlobalNavbar';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

function App() {
  return (
    <>
      <Router>
        <Theme>
          <GlobalStyles />
          <GlobalNavbar />
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
        </Theme>
      </Router>
    </>
  );
}

export default App;
