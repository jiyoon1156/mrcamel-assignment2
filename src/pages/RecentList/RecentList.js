import React, { Component } from 'react';

import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'pages/RecentList/ProductList/ProductList';

class RecentList extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      notInterestChecked: false,
    };

    this.inquireData = [0, 1, 2, 3, 4, 5, 6, 12];
    this.notInterestData = [0, 1, 2];

    this.onNotInterestClick = this.onNotInterestClick.bind(this);
  }

  componentDidMount() {
    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        const result = data
          .filter((_, i) => this.inquireData.indexOf(i) !== -1)
          .map((elem, i) => {
            return {
              ...elem,
              notInterest: this.notInterestData.indexOf(i) !== -1,
            };
          });

        this.setState({
          data: result,
        });
      });
  }

  onNotInterestClick() {
    const { notInterestChecked } = this.state;

    this.setState({
      notInterestChecked: !notInterestChecked,
    });
  }

  render() {
    const { data, notInterestChecked } = this.state;

    return (
      <Container>
        <FilterBar data={data} onNotInterestClick={this.onNotInterestClick} />
        <ProductList data={data} notInterestChecked={notInterestChecked} />
      </Container>
    );
  }
}

const Container = styled.div``;

export default RecentList;
