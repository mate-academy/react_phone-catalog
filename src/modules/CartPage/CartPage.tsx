import styles from './CartPage.module.scss';
import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { PhonesTitle } from '../Shared/PhonesTitle';
import { Cart } from './Cart/Cart';
import { Phone } from '../../Types/type';

interface CartProps {
  itemsInCart: Phone[];
  toggleFavourite: (product: Phone) => void;

}


export const CartPage = ({ itemsInCart, toggleFavourite }: CartProps) => {
  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Cart
        itemsInCart={itemsInCart}
        toggleFavourite={toggleFavourite}
      />
    </>
  );
}