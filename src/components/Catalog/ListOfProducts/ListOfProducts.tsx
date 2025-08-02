/* eslint-disable max-len */
import { useContext } from 'react';
import { Accessories } from '../../../types/Accessories';
import { Phones } from '../../../types/Phones';
import { Tablets } from '../../../types/Tablets';
import './ListOfProducts.scss';
import { ProductsContext } from '../../../context/ProductContext';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  visibleProducts: Phones[] | Tablets[] | Accessories[];
};

export const ListOfProducts: React.FC<Props> = ({ visibleProducts }) => {
  const { products } = useContext(ProductsContext);
  const { onToggleLike, favoritesProducts } = useContext(ProductsContext);
  const { onAddProduct, addedCartProducts } = useContext(ProductsContext);

  return (
    <div className="list">
      {visibleProducts.map(item => {
        return (
          <div className="card" key={item.id}>
            <Link to={`${item.id}`} className="card__link-product-id">
              <img
                className="card__image"
                src={item.images[0]}
                alt={item.name}
              />
              <p className="card__name">{item.name}</p>
            </Link>

            <div className="card__prices">
              <p className="card__price--discount">${item.priceDiscount}</p>
              <p className="card__price--regular">${item.priceRegular}</p>
            </div>

            <div className="card__spec">
              <p className="card__label">Screen</p>
              <p className="card__value">
                {products.find(val => val.itemId === item.id)?.screen}
              </p>
            </div>
            <div className="card__spec">
              <p className="card__label">Capacity</p>
              <p className="card__value">{item.capacity}</p>
            </div>
            <div className="card__spec">
              <p className="card__label">RAM</p>
              <p className="card__value">{item.ram}</p>
            </div>

            <div className="card__actions">
              <button
                className={classNames('card__button--add', {
                  'card__button--add--active': addedCartProducts.some(a => {
                    return a.productId === item.id;
                  }),
                })}
                onClick={() => {
                  onAddProduct(item.id);
                }}
              >
                {addedCartProducts.some(a => {
                  return a.productId === item.id;
                })
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                className={classNames('card__button--like', {
                  'card__button--like--active': favoritesProducts.includes(
                    item.id,
                  ),
                })}
                onClick={() => {
                  onToggleLike(item.id);
                }}
              >
                {!favoritesProducts.includes(item.id) && (
                  <img src="./icons/like.svg" alt="like" />
                )}
                {favoritesProducts.includes(item.id) && (
                  <img src="./icons/liked.svg" alt="like" />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
