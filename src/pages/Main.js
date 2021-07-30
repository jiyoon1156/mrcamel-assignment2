import React, { Component } from 'react';
import ProductList from 'components/ProductList';

const API = 'data/data.json';
class Main extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  async componentDidMount() {
    const response = await fetch(API);
    const json = await response.json();
    this.setState({ data: json });
  }

  render() {
    const { data } = this.state;
    return <ProductList data={data} />;
  }
}

export default Main;
