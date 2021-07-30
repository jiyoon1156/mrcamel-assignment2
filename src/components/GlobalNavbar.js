import React from 'react';
import styled from 'styled-components';
import { Link as ReactRouterDomLink } from 'react-router-dom';

class GlobalNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Nav>
        <Logo to="/">
          mr.<span>Camel</span>
        </Logo>
        <Hamburger onClick={() => this.setState({ isOpen: !isOpen })}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpen}>
          <MenuLink to="/recentList">상품조회 이력</MenuLink>
        </Menu>
      </Nav>
    );
  }
}

const Link = ({ children, ...props }) => {
  return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const MenuLink = styled(Link)`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #67bc98;
  transition: all 0.3s ease-in;
  font-size: 1rem;
  &:hover {
    color: #7b7fda;
  }
`;

const Nav = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #1f29f0;
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
`;

const Logo = styled(Link)`
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
  span {
    font-weight: 400;
    font-size: 1.375rem;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

export default GlobalNavbar;
