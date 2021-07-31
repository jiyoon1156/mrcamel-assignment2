import React, { Component } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main/Main';
import Product from 'pages/Product/Product';
import RecentList from 'pages/RecentList/RecentList';
import GlobalNavbar from 'components/GlobalNavbar';
import GlobalStyles from 'styles/GlobalStyles';
import Theme from 'styles/Theme';
import Storage from 'utils/Storage';

const LAST_SAVE_DATE_STORAGE_KEY = 'lastSaveDate';

class App extends Component {
  componentDidMount() {
    const now = new Date();
    const todayDate = now.getDate();
    const nowTime = now.getTime();
    const lastSaveDateObj = Storage.get(LAST_SAVE_DATE_STORAGE_KEY);

    if (lastSaveDateObj && lastSaveDateObj.date < todayDate && lastSaveDateObj.timestamp < nowTime) {
      Storage.clear();
    }
  }

  render() {
    const resetStorage = () => {
      const date = new Date();
      const min = date.getMinutes();
      const hours = date.getHours();
      const sec = date.getSeconds();

      if (localStorage && min + hours + sec === 0) {
        Storage.clear();
      }
    };

    setInterval(resetStorage, 1000);

    return (
      <Router>
        <Theme>
          <GlobalStyles />
          <StyledContainer>
            <GlobalNavbar />

            <Switch>
              <Route path="/product" component={Product} />
              <Route path="/recentList" component={RecentList} />
              <Route path="/" component={Main} />
            </Switch>
          </StyledContainer>
        </Theme>
      </Router>
    );
  }
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default App;
