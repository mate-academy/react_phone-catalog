// src/components/LangageSwitcher/LangageSwitcher.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LangageSwitcher from './LanguageSwitcher';

// Mock the i18n module used by the component
const changeLanguage = jest.fn();

jest.mock('../../i18n', () => ({
  __esModule: true,
  default: {
    language: 'en',
    changeLanguage,
    on: jest.fn(),
    off: jest.fn(),
  },
}));

describe('LangageSwitcher', () => {
  beforeEach(() => {
    changeLanguage.mockClear();
    // clear localStorage if component persists language
    window.localStorage.clear();
  });

  test('renders select with language options', () => {
    render(<LangageSwitcher />);
    const select = screen.getByLabelText(/selecionar idioma/i);

    expect(select).toBeInTheDocument();

    // Expect at least the two options we provide in the component
    expect(
      screen.getByRole('option', { name: /english/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: /português/i }),
    ).toBeInTheDocument();
  });

  test('calls i18n.changeLanguage when user selects another language', () => {
    render(<LangageSwitcher />);
    const select = screen.getByLabelText(/selecionar idioma/i);

    fireEvent.change(select, { target: { value: 'pt' } });
    expect(changeLanguage).toHaveBeenCalledWith('pt');
  });
});
