import Layout from '../pages/Layout';
import PathCategory from '../components/PathCategory/PathCategory';
import Cart from '../components/Cart/Cart';

const CartPage = () => {
  return (
    <Layout>
      <PathCategory />
      <Cart />
    </Layout>
  );
};

export default CartPage;
