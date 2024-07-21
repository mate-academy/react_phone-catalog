import { useLocalStorage } from 'usehooks-ts';
import { BasketGoods, Product } from '../types/product';
import shoppingBag from '../images/icons/shopping-bag.svg';
import favouritesGoods from '../images/icons/favourites-goods.svg';

export const useDashboard = () => {
  const [favourites] = useLocalStorage<Product['itemId'][]>('favourites', []);
  const [basketGoods] = useLocalStorage<BasketGoods[]>('basketGoods', []);

  return {
    dashboardItems: [
      {
        id: 1,
        to: 'favourites',
        src: favouritesGoods,
        alt: 'Favorites Goods',
        count: favourites.length,
      },
      {
        id: 2,
        to: 'basket',
        src: shoppingBag,
        alt: 'Shopping Bag',
        count: basketGoods.reduce((acc, item) => acc + item.quantity, 0),
      },
    ],
    dashboardNavigation: [
      { id: 1, title: 'home', link: '/' },
      { id: 2, title: 'phones', link: 'phones' },
      { id: 3, title: 'tablets', link: 'tablets' },
      { id: 4, title: 'accessories', link: 'accessories' },
    ],
  };
};
