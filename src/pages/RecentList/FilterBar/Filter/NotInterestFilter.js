import React, { Component } from 'react';
import styled from 'styled-components';

class NotInterestFilter extends Component {
  render() {
    const { onNotInterestClick } = this.props;

    return (
      <Label htmlFor="notInterest">
        <h3>관심없는 상품 제외</h3>
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
  padding: 12px 28px 0 56px;
  user-select: none;
  white-space: nowrap;

  h3 {
    margin-right: 3px;
    color: #333333;
    font-size: 15px;
  }

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
  border-radius: 2px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  background-color: #fff;

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
