import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 3px solid grey;
  border-right: 3px solid grey;
  border-bottom: 3px solid grey;
  border-color: ${({ theme }) => theme.color.primary};
  border-left: 4px solid #0b228a;
  background: transparent;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export default Spinner;
