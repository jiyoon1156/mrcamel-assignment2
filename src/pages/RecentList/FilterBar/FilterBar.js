/* eslint-disable */
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
        <BrandFilter
          brandFilterList={brandFilterList}
          selectedBrand={selectedBrand}
          selectBrand={selectBrand}
          isDroped={isDroped}
          handleDrop={handleDrop}
        />
        <NotInterestFilter onNotInterestClick={onNotInterestClick} />
        <SortingFilter sortByFilter={sortByFilter} />
      </FilterContainer>
    );
  }
}

const FilterContainer = styled.div`
  align-items: center;
  align-self: center;
  border: 2px solid #dcdcdc;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  margin: 40px 0 5px 0;
  padding: 16px 0;

  & > :nth-child(2n - 1) {
    margin: 0 40px;
  }
`;

export default FilterBar;
