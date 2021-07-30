/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const API = 'data/data.json';

class ProductList extends React.Component {
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
    return (
      <StyledShop>
        {data.map((item) => (
          <StyledProducts>
            <StyledTitle key={item.title}>{item.title}</StyledTitle>
          </StyledProducts>
        ))}
      </StyledShop>
    );
  }
}

const StyledShop = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
`;

const StyledProducts = styled.li`
  width: 15%;
  height: 15rem;
  background: #efeded;
  border-radius: 20px;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    background: blue;
  }
`;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 15px;
  line-height: 30px;
  padding: 1rem;
  box-sizing: border-box;
`;

export default ProductList;
