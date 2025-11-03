import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../ProductsContext/CartContext';
import { useFavourite } from '../../../ProductsContext/FavouriteContext';
import { Product } from '../../../ProductsContext/TabsContext';
import { scrollToTop } from '../navigate/ToTop';

export const useProductActions = (element: Product) => {
  const { favourites, toggleFavourite } = useFavourite();
  const { cartItems, toggleCart } = useCart();
  const navigate = useNavigate();

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
    { name: 'Screen', value: element.screen },
    { name: 'Resolution', value: element.details?.resolution },
    { name: 'Processor', value: element.details?.processor },
    { name: 'RAM', value: element.ram },
    { name: 'Built in memory', value: element.capacity },
    { name: 'Camera', value: element.details?.camera },
    { name: 'Zoom', value: element.details?.zoom },
    { name: 'Cell', value: element.details?.cell },
  ];

  const openProduct = () => {
    navigate(`/${element.category}/product/${element.id}`);
    scrollToTop();
  };

  return {
    toggleFavourite: () => toggleFavourite(element.id),
    toggleCart: () => toggleCart(element.id),
    isFavourite,
    isInCart,
    openProduct,
    informCard,
    informList,
    techSpecsList,
  };
};
