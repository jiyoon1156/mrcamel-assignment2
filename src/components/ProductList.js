/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Storage from 'utils/Storage';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick() {
    // eslint-disable-next-line no-alert
    alert('관심없는 상품입니다!!');
  }

  render() {
    const { data, notInterestChecked, selectedBrand } = this.props;
    const accessDeniedItem = Storage.get('noInterest') || [];

    if (data.length === 0) {
      return <Empty>조회 이력이 없습니다.</Empty>;
    }

    return (
      <StyledShop>
        {data.map((item, index) => {
          if (notInterestChecked && item.notInterest) return null;
          if (selectedBrand?.length && !selectedBrand.includes(item.brand)) return null;

          const id = item.id ?? index;

          return accessDeniedItem.includes(id) ? (
            <StyledProductsNonLink key={item.title} onClick={this.handleClick}>
              <StyledTitle>
                {item.title}
                <br />
                {item.price}원
              </StyledTitle>
            </StyledProductsNonLink>
          ) : (
            <StyledProducts key={item.title} to={`/product?index=${id}`}>
              <StyledTitle>
                {item.title}
                <br />
                {item.price}원
              </StyledTitle>
            </StyledProducts>
          );
        })}
      </StyledShop>
    );
  }
}

const StyledShop = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledProductsNonLink = styled.div`
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

const Empty = styled.div`
  display: flex;
  justify-content: center;
`;

export default ProductList;
