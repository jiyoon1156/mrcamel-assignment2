/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <StyledShop>
        {data.map((item, index) => (
          <StyledProducts key={item.title} to={`/product?index=${index}`}>
            <StyledTitle>{item.title}</StyledTitle>
          </StyledProducts>
        ))}
      </StyledShop>
    );
  }
}

const StyledShop = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledProducts = styled(Link)`
  width: 20%;
  height: 15rem;
  background: ${({ theme }) => theme.color.secondary};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.color.light} inset;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.light};
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  padding: 1rem;
`;

export default ProductList;
