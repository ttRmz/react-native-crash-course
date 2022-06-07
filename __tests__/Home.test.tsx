import React from 'react';
import 'react-native';
import Home from '../src/pages/Home';
import {render} from '../test-utils';

test('should render Home page correctly', () => {
  const {toJSON} = render(<Home />);
  expect(toJSON()).toMatchSnapshot();
});
