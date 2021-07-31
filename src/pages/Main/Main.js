import React, { Component } from 'react';
import ProductList from 'components/ProductList';
import Storage from 'utils/Storage';

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
      <>
        <ProductList data={data} />
      </>
    );
  }
}

export default Main;
