import React, { Component } from 'react';

import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'pages/RecentList/ProductList/ProductList';

class RecentList extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data,
        });
      });
  }

  render() {
    const { data } = this.state;

    return (
      <Container>
        <FilterBar data={data} />
        <ProductList />
      </Container>
    );
  }
}

const Container = styled.div``;

export default RecentList;
