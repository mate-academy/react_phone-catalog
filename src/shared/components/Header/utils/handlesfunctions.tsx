export const getIcon = ({ isOpen }: { isOpen: number }) => {
  if (isOpen === 1) {
    return 'img/header/close.svg';
  }

  return 'img/header/menu.svg';
};
