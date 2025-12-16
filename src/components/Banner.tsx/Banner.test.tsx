import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';

describe('Banner', () => {
  it('renders with data-testid', () => {
    render(<Banner>Conteúdo</Banner>);
    const el = screen.getByTestId('banner');

    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('role', 'region');
  });
});
