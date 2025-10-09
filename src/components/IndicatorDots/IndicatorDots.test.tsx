import React from 'react';
import { render, screen } from '@testing-library/react';
import IndicatorDots from './IndicatorDots';

describe('IndicatorDots', () => {
  test('renders the correct number of dots based on count', () => {
    render(<IndicatorDots count={3} activeIndex={0} />);
    const dots = [
      screen.getByTestId('indicator-dot-0'),
      screen.getByTestId('indicator-dot-1'),
      screen.getByTestId('indicator-dot-2'),
    ];

    expect(dots).toHaveLength(3);
  });

  test('marks the correct dot as active according to activeIndex', () => {
    render(<IndicatorDots count={3} activeIndex={1} />);
    const active = screen.getByTestId('indicator-dot-1');

    expect(active.getAttribute('data-active')).toBe('true');
    // ensure others are not active
    expect(
      screen.getByTestId('indicator-dot-0').getAttribute('data-active'),
    ).toBe('false');
    expect(
      screen.getByTestId('indicator-dot-2').getAttribute('data-active'),
    ).toBe('false');
  });

  test('applies width and color from props to active and inactive dots', () => {
    render(
      <IndicatorDots
        count={3}
        activeIndex={2}
        width={10}
        activeWidth={30}
        height={8}
        activeColor="rgb(1,2,3)"
        inactiveColor="rgb(200,200,200)"
      />,
    );

    const inactive = screen.getByTestId('indicator-dot-0');
    const active = screen.getByTestId('indicator-dot-2');

    // checar estilo inline (ou adapte se seu componente usar classes)
    const inactiveStyle = window.getComputedStyle(inactive);
    const activeStyle = window.getComputedStyle(active);

    expect(inactiveStyle.width).toBe('10px');
    expect(inactiveStyle.height).toBe('8px');
    expect(inactiveStyle.backgroundColor).toBe('rgb(200, 200, 200)');

    expect(activeStyle.width).toBe('30px');
    expect(activeStyle.height).toBe('8px');
    expect(activeStyle.backgroundColor).toBe('rgb(1, 2, 3)');
  });

  test('has wrapper with expected data-testid and is hidden from screen readers if intended', () => {
    render(<IndicatorDots count={3} activeIndex={0} />);
    const wrapper = screen.getByTestId('indicator-dots');

    expect(wrapper).toBeInTheDocument();
    // se o componente usa aria-hidden para decorativo:
    expect(wrapper.getAttribute('aria-hidden')).toBe('true');
  });

  // opcional snapshot
  // test('matches snapshot', () => {
  //   const { asFragment } = render(<IndicatorDots count={3} activeIndex={0} />);
  //   expect(asFragment()).toMatchSnapshot();
  // });
});
