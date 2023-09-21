import { useAppSelector } from '../app/hooks';
import { CartEmpty } from '../componets/cartEmpty/CartEmpty';
import { CartList } from '../componets/cartList/CartList';
import { PageHeading } from '../componets/pageHeading/PageHeading';
import { ReferenceBack } from '../componets/referenceBack/RefereneBack';

export const CartPage: React.FC = () => {
  const items = useAppSelector(state => state.cart.items);

  return (
    <div className="page__container">
      <ReferenceBack />
      <PageHeading title="Cart" />
      {items.length > 0
        ? <CartList />
        : <CartEmpty /> }
    </div>
  );
};
