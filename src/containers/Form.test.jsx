import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Form from './Form';

describe('Form component', () => {
  afterEach(() => cleanup());

  it('snpashot test Form', () => {
    const { asFragment } = render(<Form />);
    expect(asFragment()).toMatchSnapshot();
  });

});
