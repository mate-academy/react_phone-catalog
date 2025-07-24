import { useContext } from 'react';
import { Products } from '../../../types/Products';
import { ProductsContext } from '../../../context/ProductContext';
import classNames from 'classnames';

type Props = {
  filterFavoriteProducts: Products[];
  onToggleLike: (id: string) => void;
};

export const ListOfFavorite: React.FC<Props> = ({
  filterFavoriteProducts,
  onToggleLike,
}) => {
  const { favoritesProducts } = useContext(ProductsContext);
  const { onAddProduct, addedCartProducts } = useContext(ProductsContext);

  return (
    <div className="list">
      {filterFavoriteProducts.map(item => {
        return (
          <div className="card" key={item.id}>
            <img className="card__image" src={item.image} alt={item.name} />
            <p className="card__name">{item.name}</p>

            <div className="card__prices">
              <p className="card__price--discount">${item.price}</p>
              <p className="card__price--regular">${item.fullPrice}</p>
            </div>

            <div className="card__spec">
              <p className="card__label">Screen</p>
              <p className="card__value">{item.screen}</p>
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
                    return a.productId === item.itemId;
                  }),
                })}
                onClick={() => {
                  onAddProduct(item.itemId);
                }}
              >
                {addedCartProducts.some(a => {
                  return a.productId === item.itemId;
                })
                  ? 'Added to cart'
                  : 'Add to cart'}
              </button>
              <button
                className="card__button--like"
                onClick={() => {
                  onToggleLike(item.itemId);
                }}
              >
                {!favoritesProducts.includes(item.itemId) && (
                  <img src="./icons/like.svg" alt="like" />
                )}
                {favoritesProducts.includes(item.itemId) && (
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
