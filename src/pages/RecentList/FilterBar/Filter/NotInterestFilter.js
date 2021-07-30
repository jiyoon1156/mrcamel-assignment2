import React, { Component } from 'react';

import styled from 'styled-components';

class NotInterestFilter extends Component {
  render() {
    const { onNotInterestClick } = this.props;

    return (
      <Label htmlFor="notInterest">
        관심없는 상품 제외
        <Input id="notInterest" type="checkbox" onChange={onNotInterestClick} />
        <Span />
      </Label>
    );
  }
}

const Label = styled.label`
  cursor: pointer;
  display: block;
  position: relative;
  padding-right: 26px;
  user-select: none;
  white-space: nowrap;

  &:hover > span {
    border-color: #808080;
  }

  &:hover > span:after {
    border-color: #808080;
  }
`;

const Input = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;

  &:checked ~ span {
    background-color: #2196f3;
    border-color: #2196f3;
  }

  &:checked ~ span:after {
    border-color: white;
  }
`;

const Span = styled.span`
  border: 2px solid #a9a9a9;
  border-radius: 10%;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;

  &:after {
    border: solid #a9a9a9;
    border-width: 0 3px 3px 0;
    content: '';
    display: block;
    height: 12px;
    left: 6px;
    position: absolute;
    top: 3px;
    transform: rotate(45deg);
    width: 8px;
  }
`;

export default NotInterestFilter;
