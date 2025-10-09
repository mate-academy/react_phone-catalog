import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ChevronButton from './ChevronButton';

/**
 * Tipos mínimos para as factories globais de mock (Jest / Vitest).
 * Não importa aqui o shape exato, apenas que exista uma função `fn`.
 */
type MockFactory = () => (...args: unknown[]) => unknown;

const getGlobalMockFactory = (): MockFactory => {
  const g = globalThis as unknown as {
    jest?: { fn: MockFactory };
    vi?: { fn: MockFactory };
  };

  if (typeof g.jest !== 'undefined' && typeof g.jest.fn === 'function') {
    return g.jest.fn;
  }

  if (typeof g.vi !== 'undefined' && typeof g.vi.fn === 'function') {
    return g.vi.fn;
  }

  // fallback simples: retorna uma função "fake" que registra chamadas
  // com a mesma API mínima esperada pelos assertions (`mock`).
  return (() => {
    const calls: unknown[][] = [];
    const fn = (...args: unknown[]) => {
      calls.push(args);
    };

    // adicionar propriedade `mock` para compatibilidade com jest/vi `fn()`
    (fn as unknown as { mock: { calls: unknown[][] } }).mock = { calls };

    return fn as unknown as MockFactory;
  })();
};

describe('ChevronButton', () => {
  it('renders and has the container class and data-testid', () => {
    render(<ChevronButton />);
    const btn = screen.getByTestId('chevron-button');

    expect(btn).toBeInTheDocument();
    expect(btn.className.length).toBeGreaterThan(0);
    expect(btn).toHaveAttribute('data-testid', 'chevron-button');
  });

  it('calls onClick when clicked', () => {
    const mockFactory = getGlobalMockFactory();
    const fn = mockFactory();

    render(<ChevronButton onClick={fn} />);
    fireEvent.click(screen.getByTestId('chevron-button'));

    // Se estivermos em Jest/Vitest, a função retornada é um mock completo e
    // terá o matcher .toHaveBeenCalledTimes. Caso o fallback tenha sido usado,
    // verificamos o registro manualmente.
    try {
      // tentar matcher do ambiente (Jest/Vitest)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(fn as any).toHaveBeenCalledTimes(1);
    } catch {
      // fallback: inspeciona a propriedade `mock.calls` que adicionamos
      const maybeMock = fn as unknown as { mock?: { calls?: unknown[][] } };

      expect(maybeMock.mock?.calls?.length ?? 0).toBe(1);
    }
  });
});
