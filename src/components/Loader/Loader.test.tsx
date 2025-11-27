import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders with default message', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<Loader message="Buscando produtos..." />);
    expect(screen.getByText('Buscando produtos...')).toBeInTheDocument();
  });
});
