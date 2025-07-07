import { useContext } from 'react';
import { Product } from '../types/Product';
import { ProductsContext } from '../context/ProductsContext';
import './ButtonAdd.scss';

type Props = {
  addedProduct: Product;
};

export const ButtonAddToCart: React.FC<Props> = ({ addedProduct }) => {
  const { cartProducts, addToCart } = useContext(ProductsContext);
  const isAddedToCart =
    cartProducts.some(pr => pr.id === addedProduct.id) || undefined;

  return (
    <button
      disabled={isAddedToCart}
      className="button-add"
      onClick={() => addToCart(addedProduct)}
    >
      {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
};
