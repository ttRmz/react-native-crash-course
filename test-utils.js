import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import React from 'react';

const AllTheProviders = ({children}) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {customRender as render};
