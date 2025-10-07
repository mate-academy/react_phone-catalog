//__________
// BLOCO IMPORT
// Vitest + React Testing Library + userEvent + mocks para assets estáticos
//__________
import { describe, test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

//__________
// BLOCO HELPERS
// createUser: instancia userEvent; findButton/findNav: queries reutilizáveis
//__________
const createUser = () => userEvent.setup();
const findButton = () =>
  screen.getByRole('button', { name: /abrir menu|fechar menu/i });
const findNav = () => screen.getByRole('navigation');

//__________
// BLOCO SUITE
// Testes organizados por comportamento esperado do componente Navbar
//__________
describe('Navbar component', () => {
  // TEST 1: Render básico e atributos ARIA
  test('renderiza logo e botão hamburguer com atributos ARIA', () => {
    render(<Navbar />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    const btn = findButton();

    expect(btn).toHaveAttribute('aria-controls', 'primary-navigation');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  // TEST 2: Toggle do menu e visibilidade
  test('abre e fecha o menu ao clicar e atualiza aria-expanded', async () => {
    const user = createUser();

    render(<Navbar />);
    const btn = findButton();

    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    expect(findNav()).toBeVisible();

    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  // TEST 3: Gerenciamento de foco (a11y) - busca dentro da nav para evitar colisão com o link do logo
  test('quando abre, foco vai para o primeiro link e ao fechar volta ao botão', async () => {
    // eslint-disable-line max-len
    const user = createUser();

    render(<Navbar />);

    const btn = findButton();

    await user.click(btn); // abre o menu

    const nav = findNav();
    const firstLink = await within(nav).findByRole('link', {
      name: /HOME|home/i,
    });

    expect(document.activeElement).toBe(firstLink);

    await user.click(firstLink); // clicar fecha o menu
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(btn);
  });

  // TEST 4: Uso de props.links válidos (abre o menu antes de procurar os links)
  test('usa links passados via props quando válidos', async () => {
    const user = createUser();
    const custom = [
      { id: 'a', label: 'A', href: '/a' },
      { id: 'b', label: 'B', href: '/b' },
    ];

    render(<Navbar links={custom} />);

    // abrir o menu para tornar os links acessíveis ao Testing Library
    const btn = findButton();

    await user.click(btn);

    const nav = findNav();

    expect(within(nav).getByRole('link', { name: 'A' })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'B' })).toBeInTheDocument();
  });

  // TEST 5: Fallback quando props inválidas (validação runtime) - busca dentro da nav
  test('ignora links inválidos e usa fallback padrão', async () => {
    // @ts-expect-error intencional: forçar valor inválido para testar fallback
    render(<Navbar links={{ foo: 'bar' }} />);

    const user = createUser();
    const btn = findButton();

    await user.click(btn); // abrir o menu para tornar o item acessível

    const nav = findNav();

    expect(
      within(nav).getByRole('link', { name: /HOME/i }),
    ).toBeInTheDocument();
  });
});
