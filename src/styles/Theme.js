import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const theme = {
  color: {
    primary: '#1f29f0',
    secondary: '#efeded',
    light: '#fff',
    dark: '#7b7fda',
  },
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
