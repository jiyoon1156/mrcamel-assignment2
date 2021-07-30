import React, { Component } from 'react';
import styled from 'styled-components';

class BrandFilter extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     date: false,
  //   };
  // }

  // handleDrop = () => {
  //   this.setState({
  //     date: true,
  //   });
  //   console.log(date);
  // };
  constructor() {
    super();
    this.state = {
      isDroped: '',
    };
  }

  handleDrop = () => {
    this.setState({ isDroped: !this.state.isDroped });
  };

  render() {
    const { isDroped } = this.state;
    return (
      <BrandBox>
        <OptionBox onClick={this.handleDrop}>
          <span>Brand</span> <i className="fas fa-sort-down" />
        </OptionBox>
        <BrandSelect isDrop={isDroped}>
          <DropList>Nike</DropList>
          <DropList>Nike</DropList>
          <DropList>Nike</DropList>
          <DropList>Nike</DropList>
          <DropList>Nike</DropList>
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
  }

  i {
    padding-bottom: 7px;
  }

  &:hover {
    opacity: 0.7;
    color: gray;
  }
`;

const BrandSelect = styled.div`
  position: absolute;
`;

const DropList = styled.div`
  display: ${(props) => (props.isDrop ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 40px;
  border: 1px solid #ededed;
  border-radius: 6px;
  background-color: #fff;
`;

export default BrandFilter;
