/* eslint-disable */
import React, { Component } from 'react';

import styled from 'styled-components';

const selectBoxList = ['최근 조회 순', '낮은 가격 순'];

class SortingFilter extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      selected: 0,
    };
  }

  onButtonClick(index) {
    const { sortByFilter } = this.props;

    sortByFilter(index);

    this.setState({
      isOpen: false,
      selected: index,
    });
  }

  render() {
    const { isOpen, selected } = this.state;

    return (
      <SelectBox isOpen={isOpen}>
        <Button onClick={() => this.setState({ isOpen: !isOpen })}>{selectBoxList[selected]}</Button>
        <BoxList isOpen={isOpen} selected={selected}>
          {selectBoxList.map((elem, i) => (
            <Button key={i} onClick={() => this.onButtonClick(i)}>
              {elem}
            </Button>
          ))}
        </BoxList>
      </SelectBox>
    );
  }
}

const SelectBox = styled.div`
  border-radius: 1px;
  box-shadow: 0 1px 2px 0 #808080;
  position: relative;
  user-select: none;

  & > :first-child:after {
    content: '${({ isOpen }) => (isOpen ? '▲' : '▼')}';
    position: absolute;
    right: 10px;
  }
`;

const Button = styled.div`
  background-color: #fff;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 35px 10px 10px;
`;

const BoxList = styled.ul`
  border-top: 1px solid #dcdcdc;
  border-radius: 1px;
  box-shadow: 0 1px 2px 0 #808080;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  left: 0px;
  position: absolute;

  & > div:hover {
    background-color: #f3f3f3;
  }

  & > :nth-child(${({ selected }) => selected + 1}) {
    color: red;
  }
`;

export default SortingFilter;
