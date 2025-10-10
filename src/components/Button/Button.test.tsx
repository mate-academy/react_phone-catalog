import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button component', () => {
  it('renders with children when provided', () => {
    render(
      <Button data-testid="btn" className="extra">
        Click me
      </Button>,
    );
    const btn = screen.getByTestId('btn') as HTMLButtonElement;
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Click me');
    expect(btn.className).toContain('extra');
  });

  it('renders with text prop when no children', () => {
    render(<Button data-testid="btn-text" text="Press" />);
    const btn = screen.getByTestId('btn-text');
    expect(btn).toHaveTextContent('Press');
  });

  it('fires onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <Button data-testid="btn-click" onClick={handleClick}>
        Ok
      </Button>,
    );
    const btn = screen.getByTestId('btn-click');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards aria-label, type, data-testid and other native props', () => {
    render(
      <Button
        data-testid="btn-props"
        ariaLabel="my-button"
        type="submit"
        disabled
        title="extra"
      >
        Test
      </Button>,
    );
    const btn = screen.getByTestId('btn-props') as HTMLButtonElement;
    expect(btn.getAttribute('aria-label')).toBe('my-button');
    expect(btn.type).toBe('submit');
    expect(btn).toBeDisabled();
    expect(btn.getAttribute('title')).toBe('extra');
  });

  it('applies variant and size classes together with custom className', () => {
    render(
      <Button
        data-testid="btn-classes"
        variant="secundary"
        size="lg"
        className="custom-class"
      >
        Styled
      </Button>,
    );
    const btn = screen.getByTestId('btn-classes');
    expect(btn.className).toContain('custom-class');
    expect(btn.className).toContain('secundary');
    expect(btn.className).toContain('lg');
  });
});
