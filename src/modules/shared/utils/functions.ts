import { Products } from '../types/Products';

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const toggleFunction = (
  productsId: Products['id'],
  state: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  state(currentIds => {
    if (currentIds.includes(productsId)) {
      return currentIds.filter(current => current !== productsId);
    } else {
      return [...currentIds, productsId];
    }
  });
};
