export const closeMenuOnClick = (
  isMenuOpen: boolean,
  toggleMenu: () => void,
) => {
  if (isMenuOpen) {
    toggleMenu();
  }
};
