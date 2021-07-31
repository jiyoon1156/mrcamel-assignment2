/* eslint-disable */

import React, { Component } from 'react';
import styled from 'styled-components';

class ProductList extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    if (item.notInterest) {
      console.log('클릭 금지');
    } else {
      console.log('클릭 가능');
    }
  }

  render() {
    const { inquireData, notInterestChecked } = this.props;

    return (
      <ListContainer>
        {inquireData.map((item) => {
          if (notInterestChecked && item.notInterest) return null;
          return (
            <div key={item.title} onClick={() => this.handleClick(item)}>
              {item.id}/{item.title}/{item.price}원
            </div>
          );
        })}
      </ListContainer>
    );
  }
}

const ListContainer = styled.div``;

export default ProductList;
