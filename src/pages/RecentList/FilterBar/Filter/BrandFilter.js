import React, { Component } from 'react';
import styled from 'styled-components';
class BrandFilter extends Component {
  constructor() {
    super();
    this.state = {
      brandDropList: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { brandFilterList } = this.props;
    const { brandDropList } = this.state;

    const brandArr = [];
    if (prevProps.brandFilterList !== brandFilterList) {
      brandFilterList.map((brand) => brandArr.push(brand.brand));

      const uniqueArr = brandArr.filter((element, index) => {
        return brandArr.indexOf(element) === index;
      });

      brandDropList.push(...uniqueArr);
    }
  }

  render() {
    const { brandDropList } = this.state;
    const { isDroped, handleDrop } = this.props;

    return (
      <BrandBox>
        <OptionBox onClick={handleDrop}>
          <span>브랜드</span> {isDroped ? <i className="fas fa-sort-up" /> : <i className="fas fa-sort-down" />}
        </OptionBox>
        <BrandSelect isDrop={isDroped}>
          {brandDropList.map((brand, idx) => (
            <DropList key={idx} id={brand} onClick={this.props.selectBrand}>
              {brand}
            </DropList>
          ))}
        </BrandSelect>
      </BrandBox>
    );
  }
}

const BrandBox = styled.div``;

const OptionBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0 5px 10px 0 rgb(0 0 0 / 10%);
  background-color: #fff;
  color: #333333;

  span {
    margin-right: 10px;
    font-weight: 700;
    font-size: 15px;
  }

  .fa-sort-down {
    padding-bottom: 7px;
  }

  .fa-sort-up {
    padding-top: 7px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    color: gray;
  }
`;

const BrandSelect = styled.div`
  position: absolute;
  visibility: ${(props) => (props.isDrop ? 'visible' : 'hidden')};
  border: 1px solid #ededed;
`;

const DropList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  padding: 10px 0;
  background-color: #fff;
  color: lightgray;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: #ededed;
    color: #333333;
  }
`;

export default BrandFilter;
