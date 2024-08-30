import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';
import productsFromServer from '../../api/products.json';

import React from 'react';
import './BasketItem.scss';
import { useBasket } from '../../utils/Stores';
import classNames from 'classnames';

type Props = {
  idFromParam: string;
  category: string;
};

export const BasketItem: React.FC<Props> = ({ idFromParam, category }) => {
  const findProductFromCatalog = () =>
    productsFromServer.find(product => product.itemId === idFromParam) ||
    productsFromServer[0];

  const findProductById = () => {
    switch (category) {
      case 'phones':
        return (
          phonesFromServer.find(phone => phone.id === idFromParam) ||
          phonesFromServer[0]
        );

      case 'tablets':
        return (
          tabletsFromServer.find(tablet => tablet.id === idFromParam) ||
          tabletsFromServer[0]
        );

      case 'accessories':
        return (
          accessoriesFromServer.find(access => access.id === idFromParam) ||
          accessoriesFromServer[0]
        );

      default:
        return phonesFromServer[0];
    }
  };

  const { name, images, priceDiscount, id } = findProductById();

  const basketStore = useBasket(state => state.basket);
  const addToBasket = useBasket(state => state.addToBasket);
  const removeFromBasket = useBasket(state => state.removeFromBasket);
  const removeOneProductFromBasket = useBasket(
    state => state.removeOneProductFromBasket,
  );

  const findProduct = basketStore.filter(product => product.itemId === id);

  const counterThisProduct = findProduct.length;

  return (
    <article className="basket-item">
      <div className="basket-item__info-box">
        <button
          className="basket-item__remove-button"
          onClick={() => removeFromBasket(id)}
        >
          <img src=".\img\close-icon.svg" alt="remove product" />
        </button>
        <img
          src={images[0]}
          alt="product image"
          className="basket-item__product-image"
        />
        <h3 className="basket-item__product-name">{name}</h3>
      </div>
      <div className="basket-item__price-count-box">
        <div className="basket-item__count-box">
          <button
            className={classNames('basket-item__buttons', {
              'basket-item__buttons--disabled': counterThisProduct === 1,
            })}
            onClick={() => removeOneProductFromBasket(id)}
          >
            {counterThisProduct === 1 ? (
              <img src="./img/icon-minus-disabled.svg" alt="remove" />
            ) : (
              <img src="./img/icon-minus.svg" alt="remove" />
            )}
          </button>
          <p className="basket-item__counter">
            {basketStore.filter(product => product.itemId === id).length}
          </p>
          <button
            className="basket-item__buttons"
            onClick={() => addToBasket(findProductFromCatalog())}
          >
            <img src="./img/icon-plus.svg" alt="add" />
          </button>
        </div>
        <p className="basket-item__product-price">
          ${priceDiscount * counterThisProduct}
        </p>
      </div>
    </article>
  );
};
