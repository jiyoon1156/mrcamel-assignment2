import React, { Component } from 'react';
import BrandFilter from 'pages/RecentList/FilterBar/Filter/BrandFilter';
import NotInterestFilter from 'pages/RecentList/FilterBar/Filter/NotInterestFilter';
import SortingFilter from 'pages/RecentList/FilterBar/Filter/SortingFilter';
import styled from 'styled-components';

class FilterBar extends Component {
  render() {
    const { inquireData, onNotInterestClick, sortByFilter, brandFilterList } = this.props;
    console.log(inquireData);
    return (
      <FilterContainer>
        <BrandFilter inquireData={inquireData} brandFilterList={brandFilterList} />
        <NotInterestFilter onNotInterestClick={onNotInterestClick} />
        <SortingFilter sortByFilter={sortByFilter} />
      </FilterContainer>
    );
  }
}

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-top: 60px;
  border: 1px solid red;
`;

export default FilterBar;
