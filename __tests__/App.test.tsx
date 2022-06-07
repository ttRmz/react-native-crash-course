import {render} from '@testing-library/react-native';
import React from 'react';
import App from '../src/app/App';

test('should render App correctly', () => {
  const {toJSON} = render(<App />);
  expect(toJSON()).toMatchSnapshot();
});

// test('should go to Shows page, then go back', () => {
//   const {queryByText, getByText} = render(<App />);
//   expect(queryByText('Go Back')).toBeFalsy();

//   fireEvent.press(getByText('Go to Shows page'));
//   expect(getByText('Go Back')).toBeTruthy();
//   expect(getByText('Shows')).toBeTruthy();

//   fireEvent.press(getByText('Go Back'));
//   expect(getByText('Home page 👋')).toBeTruthy();
//   expect(queryByText('Go Back')).toBeFalsy();
// });
