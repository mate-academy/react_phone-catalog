import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

describe('Select component', () => {
  it('renders with default options', () => {
    render(<Select value="recent" onChange={() => {}} />);
    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByText('Mais recentes')).toBeInTheDocument();
    expect(screen.getByText('Em ordem alfabética')).toBeInTheDocument();
    expect(screen.getByText('Mais barato')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();

    render(<Select value="recent" onChange={handleChange} />);
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'cheap' },
    });
    expect(handleChange).toHaveBeenCalledWith('cheap');
  });
});
