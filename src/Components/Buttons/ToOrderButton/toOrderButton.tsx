import { useLocaleStorage } from '../../../Helpers/LocaleStorage';
import { Product } from '../../../Types/Product';
import './ToOrderButton.scss';

type Props = {
  product: Product,
};

export const ToOrderButton: React.FC<Props> = ({ product }) => {
  const [orderedProducts, setOrderedProducts] = useLocaleStorage('orderedItems', []);

  const addToOrder = (product: Product) => {
    setOrderedProducts(product);
  };

  return (
    <>
      {orderedProducts && !orderedProducts.some((item: Product) => item.id === product.id) ? (
        <button className="order__button order__button--add" onClick={() => addToOrder(product)}>
          Add to cart
        </button>
      ) : (
        <button className="order__button order__button--added" onClick={() => addToOrder(product)}>
          Added to carta √
        </button>
      )}
    </>
  );
};
