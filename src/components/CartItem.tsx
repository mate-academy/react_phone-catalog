/* eslint-disable max-len */
import { getFullPrice } from '../helpers/getFullPrice';
import { Product } from '../types/Product';

interface Props<T> {
  product: Product,
  save: (value: T) => void,
  products: Product[],
  setTotalPrice: (value: number) => void,
  totalPrice: number,
}

enum Action { add, substract }

export const CartItem: React.FC<Props<Product[]>> = (
  {
    product, save, products, setTotalPrice, totalPrice,
  },
) => {
  const handleNumberChange = (action: Action) => {
    if (action === Action.substract) {
      if (product.number === 1) {
        return;
      }

      setTotalPrice(totalPrice - getFullPrice(product.price, product.discount));

      const newProducts = products
        .filter(item => item.id !== product.id);

      save([...newProducts, { ...product, number: product.number - 1 }]);
    }

    if (action === Action.add) {
      setTotalPrice(totalPrice - getFullPrice(product.price, product.discount));

      const newProducts = products
        .filter(item => item.id !== product.id);

      save([...newProducts, { ...product, number: product.number + 1 }]);
    }
  };

  return (
    <div className="cart__item">
      <button
        className="cart__close"
        type="button"
        onClick={() => {
          const newProducts = products.filter((item: Product) => item.id !== product.id);

          save([...newProducts]);
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.4716 4.4714C12.7319 4.21105 12.7319 3.78894 12.4716 3.52859C12.2112 3.26824 11.7891 3.26824 11.5288 3.52859L8.00016 7.05719L4.47157 3.52859C4.21122 3.26824 3.78911 3.26824 3.52876 3.52859C3.26841 3.78894 3.26841 4.21105 3.52876 4.4714L7.05735 7.99999L3.52876 11.5286C3.26841 11.7889 3.26841 12.211 3.52876 12.4714C3.78911 12.7317 4.21122 12.7317 4.47157 12.4714L8.00016 8.9428L11.5288 12.4714C11.7891 12.7317 12.2112 12.7317 12.4716 12.4714C12.7319 12.211 12.7319 11.7889 12.4716 11.5286L8.94297 7.99999L12.4716 4.4714Z" fill="#B4BDC4" />
        </svg>

      </button>

      <img
        src={product.imageUrl}
        alt={product.name}
        className="cart__img"
      />

      <p className="cart__text body-text">{product.name}</p>

      <div className="cart__quantity">
        <button
          className="cart__button"
          type="button"
          onClick={() => {
            handleNumberChange(Action.substract);
          }}
        >
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.666504 0.999995C0.666504 0.631805 0.964981 0.333328 1.33317 0.333328H10.6665C11.0347 0.333328 11.3332 0.631805 11.3332 0.999995C11.3332 1.36818 11.0347 1.66666 10.6665 1.66666H1.33317C0.964981 1.66666 0.666504 1.36818 0.666504 0.999995Z" fill="#B4BDC4" />
          </svg>
        </button>

        <p className="cart__number body-text">{product.number}</p>

        <button
          className="cart__button"
          type="button"
          onClick={() => {
            handleNumberChange(Action.add);
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.6665 1.33334C6.6665 0.965149 6.36803 0.666672 5.99984 0.666672C5.63165 0.666672 5.33317 0.965149 5.33317 1.33334V5.33334H1.33317C0.964981 5.33334 0.666504 5.63182 0.666504 6.00001C0.666504 6.3682 0.964981 6.66667 1.33317 6.66667H5.33317V10.6667C5.33317 11.0349 5.63165 11.3333 5.99984 11.3333C6.36803 11.3333 6.6665 11.0349 6.6665 10.6667V6.66667H10.6665C11.0347 6.66667 11.3332 6.3682 11.3332 6.00001C11.3332 5.63182 11.0347 5.33334 10.6665 5.33334H6.6665V1.33334Z" fill="#B4BDC4" />
          </svg>
        </button>
      </div>

      <h2 className="cart__price">
        {`$${getFullPrice(product.price, product.discount) * product.number}`}
      </h2>
    </div>
  );
};
