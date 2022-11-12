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

enum Action { add, substruct }

export const CartItem: React.FC<Props<Product[]>> = (
  {
    product, save, products, setTotalPrice, totalPrice,
  },
) => {
  const handleNumberChange = (action: Action) => {
    if (action === Action.substruct) {
      if (product.number === 1) {
        return;
      }

      setTotalPrice(totalPrice - getFullPrice(product.price, product.discount));

      const newProducts = products.filter(prod => prod.id !== product.id);

      save([...newProducts, { ...product, number: product.number - 1 }]);
    }

    if (action === Action.add) {
      setTotalPrice(totalPrice - getFullPrice(product.price, product.discount));

      const newProducts = products.filter(prod => prod.id !== product.id);

      save([...newProducts, { ...product, number: product.number + 1 }]);
    }
  };

  return (
    <div className="cart__item">
      <button
        className="cart__close"
        type="button"
        onClick={() => {
          const newProducts = products.filter((prod: Product) => prod.id !== product.id);

          save([...newProducts]);
        }}
      >
        <img src="img/svg/cross.svg" alt="Cross" />

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
            handleNumberChange(Action.substruct);
          }}
        >
          <img src="img/svg/minus.svg" alt="Minus" />
        </button>

        <p className="cart__number body-text">{product.number}</p>

        <button
          type="button"
          className="cart__button"
          onClick={() => {
            handleNumberChange(Action.add);
          }}
        >
          <img src="img/svg/plus.svg" alt="Plus" />
        </button>
      </div>

      <h2 className="cart__price">
        {`$${getFullPrice(product.price, product.discount) * product.number}`}
      </h2>
    </div>
  );
};
