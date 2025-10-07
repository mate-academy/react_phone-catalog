import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock da imagem do logo
vi.mock('../assets/img/phones/Logo_mobile.png', () => ({
  default: 'logo.png',
}));

// Mock do CSS Module sem terceiro argumento
vi.mock('../components/Navbar/Navbar.module.css', () => ({
  default: {
    navbar: 'navbar',
    left: 'left',
    logo: 'logo',
    hamburger: 'hamburger',
    bar: 'bar',
    menu: 'menu',
    menuOpen: 'menuOpen',
    menuList: 'menuList',
  },
}));

// Um mock é um objeto ou implementação falsa que substitui uma dependência
// real durante testes. Ele imita comportamento, retornos ou estrutura de
// um módulo real para permitir testar o código em
// isolamento e sem efeitos colaterais.
