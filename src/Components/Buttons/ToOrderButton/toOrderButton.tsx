import { useLocaleStorage } from '../../../Helpers/LocaleStorage';
import { Product } from '../../../Types/Product';
import './ToOrderButton.scss';

type Props = {
  product: Product,
};

export const ToOrderButton: React.FC<Props> = ({ product }) => {
  /*
    eslint-disable @typescript-eslint/indent,
    react/jsx-indent,
    @typescript-eslint/no-unused-expressions
  */
  const [
    orderedProducts,
    setOrderedProducts,
  ] = useLocaleStorage<Product[]>('orderedItems', []);

  const addToOrder = (productData: Product) => {
    orderedProducts.some((item) => item.id === productData.id)
      ? setOrderedProducts(
          [...orderedProducts.filter(
            (item: Product) => item.id !== productData.id,
          )],
        )
      : setOrderedProducts([...orderedProducts, productData]);
  };

  return (
    <>
      {orderedProducts && !orderedProducts.some(
        (item: Product) => item.id === product.id,
      ) ? (
        <button
          type="button"
          className="order__button order__button--add"
          onClick={() => addToOrder(product)}
        >
            Add to cart
        </button>
        ) : (
          <button
            type="button"
            className="order__button order__button--added"
            onClick={() => addToOrder(product)}
          >
            Added to cart
          </button>
        )}
    </>
  );
};
