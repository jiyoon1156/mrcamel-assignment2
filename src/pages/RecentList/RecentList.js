/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'components/ProductList';

import Storage from 'utils/Storage';

class RecentList extends Component {
  constructor() {
    super();

    this.state = {
      inquireData: [],
      notInterestChecked: false,
    };

    this.onNotInterestClick = this.onNotInterestClick.bind(this);
    this.sortByFilter = this.sortByFilter.bind(this);
  }

  componentDidMount() {
    const inquireList = Storage.get('recentList') || [];
    const notInterestList = Storage.get('noInterest') || [];

    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        const result = inquireList.map((id, order) => {
          return {
            id,
            order,
            ...data.find((_, i) => id === i),
            notInterest: notInterestList.findIndex((i) => i === id) !== -1,
          };
        });

        this.setState({
          inquireData: result,
        });
      });
  }

  onNotInterestClick() {
    const { notInterestChecked } = this.state;

    this.setState({
      notInterestChecked: !notInterestChecked,
    });
  }

  sortByFilter(sortingBoxIndex) {
    const { inquireData } = this.state;
    const filterMethods = ['order', 'price'];
    const sortKey = filterMethods[sortingBoxIndex];
    const sortedData = inquireData.slice().sort((a, b) => a[sortKey] - b[sortKey]);

    this.setState({
      inquireData: sortedData,
    });
  }

  render() {
    const { inquireData, notInterestChecked } = this.state;

    return (
      <Container>
        <FilterBar
          inquireData={inquireData}
          onNotInterestClick={this.onNotInterestClick}
          sortByFilter={this.sortByFilter}
        />
        <Title>상품 조회 리스트</Title>
        <ProductList data={inquireData} notInterestChecked={notInterestChecked} />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  align-self: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export default RecentList;
