import { Breadcrumbs } from '../Shared/Breadcrumbs';
import { PhonesTitle } from '../Shared/PhonesTitle';
import { Cart } from './Cart/Cart';
import { Phone } from '../../Types/type';

interface CartProps {
  itemsInCart: Phone[];
  toggleInCart: (product: Phone) => void;
}

export const CartPage = ({ itemsInCart, toggleInCart }: CartProps) => {
  return (
    <>
      <Breadcrumbs />
      <PhonesTitle />
      <Cart itemsInCart={itemsInCart} toggleInCart={toggleInCart} />
    </>
  );
};
