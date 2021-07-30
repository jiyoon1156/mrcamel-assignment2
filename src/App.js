import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main/Main';
import Product from 'pages/Product/Product';
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
              <Route path="/product" component={Product} />
              <Route path="/recentList" component={RecentList} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        </Theme>
      </Router>
    </>
  );
}

export default App;
