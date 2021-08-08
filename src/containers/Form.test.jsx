import React from 'react';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import Form from './Form';

describe('Form component', () => {
  afterEach(() => cleanup());

  test('snpashot test Form', () => {
    const { asFragment } = render(<Form/>);
    expect(asFragment()).toMatchSnapshot();
  });

  test('mock user entering in a url', async () => {
    render(<Form/>);

    const placeholder = 'https://www.example.com/api/v1/fruit';
    const input = 'https://www.google.com/';

    const urlInput = await screen.findByPlaceholderText(placeholder);
    fireEvent.change(
      urlInput, 
      { target: { value: input } }
    );

    expect(urlInput.value).toBe(input);
  });

});
