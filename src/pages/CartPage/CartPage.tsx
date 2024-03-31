import { Breadcrumb } from '../../components/Content/Breadcrumb';
import { CartList } from '../../components/CartList';

export const CartPage = () => {
  const pach = ['Cart'];

  // console.log(addedToCart);

  return (
    <>
      <Breadcrumb path={pach} />
      <CartList />
    </>
  );
};
