// src/components/Search/Search.test.tsx
import React, { useEffect } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import {
  SearchVisibilityProvider,
  useSearchVisibility,
} from '../../context/SearchVisibilityContext';

const VisibleSetter: React.FC<{ visible: boolean }> = ({ visible }) => {
  const { setVisible } = useSearchVisibility();

  useEffect(() => {
    setVisible(visible);
  }, [visible, setVisible]);

  return null;
};

describe('Search component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('does not render when visibility is false', () => {
    render(
      <SearchVisibilityProvider>
        <Search />
      </SearchVisibilityProvider>,
    );

    // role="search" wrapper should not exist
    expect(screen.queryByRole('search')).toBeNull();
  });

  test('renders input when visibility is true', () => {
    render(
      <SearchVisibilityProvider>
        <VisibleSetter visible={true} />
        <Search />
      </SearchVisibilityProvider>,
    );

    const wrapper = screen.getByRole('search');

    expect(wrapper).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/buscar produtos/i);

    expect(input).toBeInTheDocument();
  });

  test('calls onSearch after debounce with trimmed term', () => {
    const onSearch = jest.fn();

    render(
      <SearchVisibilityProvider>
        <VisibleSetter visible={true} />
        <Search onSearch={onSearch} debounceMs={300} />
      </SearchVisibilityProvider>,
    );

    const input = screen.getByPlaceholderText(
      /buscar produtos/i,
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '  phone  ' } });

    // before debounce elapsed
    jest.advanceTimersByTime(200);
    expect(onSearch).not.toHaveBeenCalled();

    // after debounce
    jest.advanceTimersByTime(200);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('phone');
  });
});
