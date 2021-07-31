/* eslint-disable */
import React, { Component } from 'react';

import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'pages/RecentList/ProductList/ProductList';

import Storage from 'utils/Storage';

class RecentList extends Component {
  constructor() {
    super();

    this.state = {
      inquireData: [],
      notInterestChecked: false,
      brandFilterList: [],
    };

    this.onNotInterestClick = this.onNotInterestClick.bind(this);
    this.sortByFilter = this.sortByFilter.bind(this);
  }

  componentDidMount() {
    const inquireList = Storage.get('recentList') || [];
    const notInterestList = [1, 2];

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
    const { inquireData, notInterestChecked, brandFilterList } = this.state;
    console.log(inquireData);
    return (
      <Container>
        <FilterBar
          inquireData={inquireData}
          brandFilterList={brandFilterList}
          onNotInterestClick={this.onNotInterestClick}
          sortByFilter={this.sortByFilter}
        />
        <ProductList inquireData={inquireData} notInterestChecked={notInterestChecked} />
      </Container>
    );
  }
}

const Container = styled.div``;

export default RecentList;
