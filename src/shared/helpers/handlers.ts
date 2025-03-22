export const closeMenu = (isMenuOpen: boolean, toggleMenu: () => void) => {
  if (isMenuOpen) {
    toggleMenu();
  }
};
