import React, { Component } from 'react';

import ProductList from 'components/ProductList';
import Constants from 'constants/Constants';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    const response = await fetch(Constants.DATA_API);
    const json = await response.json();
    this.setState({ data: json });
  }

  render() {
    const { data } = this.state;

    return <ProductList data={data} />;
  }
}

export default Main;
