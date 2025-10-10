import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './SubTitle';

describe('SubTitle', () => {
  it('renders the text in an h2 by default', () => {
    render(<Title text="Brand new models" />);
    const el = screen.getByTestId('home-Subtitle');

    expect(el.tagName.toLowerCase()).toBe('h2');
    expect(el).toHaveTextContent('Brand new models');
  });

  it('renders correct heading level when level prop is provided', () => {
    render(<Title text="Seção" level={2} data-testid="title-2" />);
    const el = screen.getByTestId('title-2');

    expect(el.tagName.toLowerCase()).toBe('h2');
  });

  it('accepts additional className', () => {
    render(<Title text="Classe" className="extra" data-testid="title-extra" />);
    expect(screen.getByTestId('title-extra')).toHaveClass('extra');
  });
});
