import { useCart } from '../../../ProductsContext/CartContext';
import { useFavourite } from '../../../ProductsContext/FavouriteContext';
import { Product } from '../../../ProductsContext/TabsContext';
import { useOpenProduct } from './useOpenProduct';

export const useProductActions = (element: Product | undefined) => {
  const { favourites, toggleFavourite } = useFavourite();
  const { cartItems, toggleCart } = useCart();

  const { openProduct } = useOpenProduct();

  if (!element) {
    return {
      toggleFavourite: () => {},
      toggleCart: () => {},
      isFavourite: false,
      isInCart: false,
      openProduct: () => {},
      informCard: [],
      informList: [],
      techSpecsList: [],
    };
  }

  const isFavourite = favourites.includes(element.id);
  const isInCart = cartItems.includes(element.id);

  const informCard = [
    { name: 'Screen', value: element.screen },
    { name: 'Capacity', value: element.capacity },
    { name: 'RAM', value: element.ram },
  ];

  const informList = [
    { name: 'Screen', value: element.screen },
    { name: 'Resolution', value: element.details?.resolution },
    { name: 'Processor', value: element.details?.processor },
    { name: 'RAM', value: element.ram },
  ];

  const techSpecsList = [
    ...informList,
    { name: 'Built in memory', value: element.capacity },
    { name: 'Camera', value: element.details?.camera },
    { name: 'Zoom', value: element.details?.zoom },
    { name: 'Cell', value: element.details?.cell },
  ].filter(item => item.value);

  return {
    toggleFavourite: () => toggleFavourite(element.id),
    toggleCart: () => toggleCart(element.id),
    isFavourite,
    isInCart,
    openProduct: () => openProduct(element.category, element.id),
    informCard,
    informList,
    techSpecsList,
  };
};
