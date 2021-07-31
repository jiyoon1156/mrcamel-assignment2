import React, { Component } from 'react';
import styled from 'styled-components';

/* eslint-disable */

class ProductList extends Component {
  render() {
    const { data, notInterestChecked } = this.props;

    return (
      <ListContainer>
        {data.map((item, i) => {
          if (notInterestChecked && item.notInterest) return null;
          return (
            <div key={item.title}>
              {i}/{item.title}/{item.price}원
            </div>
          );
        })}
      </ListContainer>
    );
  }
}

const ListContainer = styled.div``;

export default ProductList;
