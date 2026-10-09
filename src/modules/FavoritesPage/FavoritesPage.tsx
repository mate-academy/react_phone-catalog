import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import style from './FavoritesPage.module.scss';
import '../../style/GlobalStyle.scss';
import { addToCart } from '../../features/cartSlice';
import { toggleFavorite } from '../../features/favoritesSlice';
import classNames from 'classnames';

export const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const favoritesItems = useAppSelector(state => state.favorites.items) || [];
  const cartItems = useAppSelector(state => state.cart.items) || [];

  return (
    <div className="page">
      <div className="container">
        <div className={style['navigation-block']}>
          <Link to="/">
            <img src="img/icons/home.svg" alt="" />
          </Link>
          <img src="img/icons/arrowrightdark.svg" alt="" />
          <p className={classNames(style['title-navigation'], 'small-text')}>
            Favourites
          </p>
        </div>
        <div>
          <p className={classNames(style.title, 'h1')}>Favourites</p>
          <p className={classNames(style['count-models'], 'body-text')}>
            {favoritesItems.length} items
          </p>
        </div>

        {favoritesItems.length === 0 ? (
          <p className={'body-text'}>Your favorites page is empty</p>
        ) : (
          <div className={style.list}>
            {favoritesItems.map(product => {
              const isInCart = cartItems.some(
                item =>
                  item.product.itemId === product.itemId ||
                  item.product.id === product.id,
              );

              return (
                <Link
                  to={`/${product.category}/${product.itemId}`}
                  key={product.id || product.itemId}
                  className={style['gadget-cart']}
                >
                  <div className={style['gadget-img-box']}>
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className={style['gadget-img']}
                    />
                  </div>
                  <p className={classNames(style['gadget-title'], 'body-text')}>
                    {product.name}
                  </p>

                  <div className={style['price-block']}>
                    <p className={'h3'}>${product.price}</p>

                    {product.fullPrice > product.price && (
                      <p
                        className={classNames(style['gadget-price-sale'], 'h3')}
                      >
                        ${product.fullPrice}
                      </p>
                    )}
                  </div>

                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      Screen
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.screen}
                    </p>
                  </div>
                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      Capacity
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.capacity}
                    </p>
                  </div>
                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      RAM
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.ram}
                    </p>
                  </div>
                  <div className={style['add-buttons-block']}>
                    <button
                      type="button"
                      className={
                        isInCart ? 'button-standart active' : 'button-standart'
                      }
                      onClick={e => {
                        e.preventDefault();
                        dispatch(addToCart(product));
                      }}
                    >
                      {isInCart ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className={`${style['favourites-buttons']} ${style.active}`}
                      onClick={e => {
                        e.preventDefault();
                        dispatch(toggleFavorite(product));
                      }}
                    >
                      <img
                        src="img/icons/favouritesActive.svg"
                        alt="Remove from favorites"
                      />
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
