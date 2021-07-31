/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'components/ProductList';

import Storage from 'utils/Storage';

class RecentList extends Component {
  constructor() {
    super();

    this.state = {
      inquireData: null,
      notInterestChecked: false,
      brandFilterList: [],
      selectedBrand: [],
      isDroped: false,
    };

    this.onNotInterestClick = this.onNotInterestClick.bind(this);
    this.sortByFilter = this.sortByFilter.bind(this);
    this.deleteBtn = this.deleteBtn.bind(this);
  }

  componentDidMount() {
    const inquireList = Storage.get('recentList') || [];
    const notInterestList = Storage.get('noInterest') || [];

    fetch('data/data.json')
      .then((res) => res.json())
      .then((data) => {
        const result = inquireList.map((id, order) => {
          return {
            id,
            order,
            ...data.find((_, i) => id === i),
            notInterest: notInterestList.findIndex((i) => i === id) !== -1,
          };
        });

        this.setState({
          inquireData: result,
          brandFilterList: result,
        });
      });
  }

  selectBrand = (e) => {
    const { selectedBrand } = this.state;
    selectedBrand.push(e.target.id);
    const arr = selectedBrand;
    arr.push(e.target.id);
    this.setState({
      selectedBrand: [...new Set(arr)],
      isDroped: false,
    });
  };

  onNotInterestClick() {
    const { notInterestChecked } = this.state;

    this.setState({
      notInterestChecked: !notInterestChecked,
    });
  }

  sortByFilter(sortingBoxIndex) {
    const { inquireData } = this.state;

    if (!inquireData) return;

    const filterMethods = ['order', 'price'];
    const sortKey = filterMethods[sortingBoxIndex];
    const sortedData = inquireData.slice().sort((a, b) => a[sortKey] - b[sortKey]);

    this.setState({
      inquireData: sortedData,
    });
  }

  handleDrop = () => {
    this.setState((prev) => ({ isDroped: !prev.isDroped }));
  };

  deleteBtn(brandName) {
    const { selectedBrand } = this.state;
    const newArr = selectedBrand.slice();

    this.setState({
      selectedBrand: newArr.filter((brand) => brand !== brandName),
    });
  }

  render() {
    const { inquireData, notInterestChecked, brandFilterList, selectedBrand, isDroped } = this.state;

    return (
      <Container>
        <FilterBar
          brandFilterList={brandFilterList}
          selectedBrand={selectedBrand}
          selectBrand={this.selectBrand}
          onNotInterestClick={this.onNotInterestClick}
          sortByFilter={this.sortByFilter}
          isDroped={isDroped}
          handleDrop={this.handleDrop}
        />
        {selectedBrand.length !== 0 && (
          <BrandContainer>
            <BrandBox>
              {selectedBrand.map((brand, idx) => (
                <BrandBtn key={idx} onClick={() => this.deleteBtn(brand)}>
                  {brand} <i className="fas fa-times"></i>
                </BrandBtn>
              ))}
            </BrandBox>
          </BrandContainer>
        )}

        <Title>상품 조회 리스트</Title>
        <ProductList data={inquireData} notInterestChecked={notInterestChecked} selectedBrand={selectedBrand} />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BrandContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BrandBox = styled.div`
  width: 640px;
  border-radius: 5px;
  border: 2px solid #dcdcdc;
`;

const BrandBtn = styled.button`
  margin: 2px 10px;
  padding: 10px 10px;
  border-radius: 4px;
  background-color: #3ae374;
  color: #fff;
  box-shadow: 0 0.125rem 0.625rem rgb(58 196 125 / 40%), 0 0.0625rem 0.125rem rgb(58 196 125 / 50%);

  &:hover {
    background-color: #32ff7e;
  }
`;

const Title = styled.div`
  align-self: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export default RecentList;
