import React, { Component } from 'react';
import BrandFilter from 'pages/RecentList/FilterBar/Filter/BrandFilter';
import NotInterestFilter from 'pages/RecentList/FilterBar/Filter/NotInterestFilter';
import SortingFilter from 'pages/RecentList/FilterBar/Filter/SortingFilter';
import styled from 'styled-components';

class FilterBar extends Component {
  render() {
    const { onNotInterestClick, sortByFilter, brandFilterList, selectedBrand, selectBrand, isDroped, handleDrop } =
      this.props;
    return (
      <FilterContainer>
        <SmallContainer>
          <BrandFilter
            brandFilterList={brandFilterList}
            selectedBrand={selectedBrand}
            selectBrand={selectBrand}
            isDroped={isDroped}
            handleDrop={handleDrop}
          />
          <NotInterestFilter onNotInterestClick={onNotInterestClick} />
        </SmallContainer>
        <SortingFilter sortByFilter={sortByFilter} />
      </FilterContainer>
    );
  }
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 16px 0;
  background-color: #ededed;

  & > :nth-child(2n - 1) {
    margin: 0 40px;
  }
`;

const SmallContainer = styled.div`
  display: flex;
`;

export default FilterBar;
