import React, { Component } from 'react';
import styled from 'styled-components';

import FilterBar from 'pages/RecentList/FilterBar/FilterBar';
import ProductList from 'components/ProductList';

import Storage from 'utils/Storage';
import Constants from 'constants/Constants';

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
    this.selectBrand = this.selectBrand.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  componentDidMount() {
    const inquireList = Storage.get(Constants.RECENT_LIST_STORAGE_KEY) || [];
    const notInterestList = Storage.get(Constants.NO_INTEREST_STORAGE_KEY) || [];

    fetch(Constants.DATA_API)
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

  selectBrand(e) {
    const { selectedBrand } = this.state;
    selectedBrand.push(e.target.id);
    const arr = selectedBrand;
    arr.push(e.target.id);
    this.setState({
      selectedBrand: [...new Set(arr)],
      isDroped: false,
    });
  }

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

  handleDrop() {
    this.setState((prev) => ({ isDroped: !prev.isDroped }));
  }

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

const BrandContainer = styled.div``;

const BrandBox = styled.div`
  padding-left: 20px;
`;

const BrandBtn = styled.button`
  margin: 2px 10px;
  padding: 10px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.primary};
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 0.125rem 0.625rem rgb(31 41 240 / 40%), 0 0.0625rem 0.125rem rgb(31 41 240 / 50%);
  user-select: none;

  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const Title = styled.div`
  align-self: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
  user-select: none;
`;

export default RecentList;
