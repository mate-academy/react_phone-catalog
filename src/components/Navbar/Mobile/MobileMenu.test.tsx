// src/components/Navbar/Mobile/MobileMenu.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const links = [
  { id: 'home', label: 'HOME', href: '/' },
  { id: 'phones', label: 'PHONES', href: '/phones' },
];

describe('MobileMenu', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <MobileMenu links={links} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('PHONES')).toBeInTheDocument();
  });

  it('renders divider and actions', () => {
    render(
      <MemoryRouter>
        <MobileMenu links={links} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
