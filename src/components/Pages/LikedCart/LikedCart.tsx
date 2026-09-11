import { Link } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import { useCart } from '../../CartContext/CartContext';
import { useAllProducts } from '../useAllProducts/useAllProducts';
import style from './LikedCart.module.scss';
import { Loader } from '../../Loader/Loader';

export const LikedCart: React.FC = () => {
  const { likedIds, toggleLike, cartIds, toggleCart } = useCart();
  const { products, isLoading } = useAllProducts();
  const listRef = useRef<HTMLUListElement>(null);

  const likedProducts = useMemo(
    () => products.filter(product => likedIds.has(String(product.id))),
    [products, likedIds],
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main>
      <div className={style.favourites}>
        <div className={style.home}>
          <Link to="/">
            <img
              className={style.linkimg}
              src={`${import.meta.env.BASE_URL}/img/Home.png`}
              alt="Home"
            />
          </Link>
          <p className={style.linkText}>&#707;</p>
          <p className={style.linkText}>Favourites</p>
        </div>

        <h1 className={style.title}>Favourites</h1>
        <p className={style.count}>{likedProducts.length} items</p>

        {likedProducts.length === 0 ? (
          <p className={style.empty}>You have no favourite items yet</p>
        ) : (
          <ul className={style.list} ref={listRef}>
            {likedProducts.map(product => (
              <li className={style.item} key={product.id}>
                <Link className={style.Link} to={`/product/${product.id}`}>
                  <img
                    className={style.img}
                    src={`${import.meta.env.BASE_URL}/${product.images[0]}`}
                    alt={product.name}
                  />
                </Link>
                <Link className={style.Link} to={`/product/${product.id}`}>
                  {' '}
                  <p className={style.name}>{product.name}</p>
                </Link>
                <p className={style.price}>
                  ${product.priceDiscount}{' '}
                  <span className={style.fullprice}>
                    ${product.priceRegular}
                  </span>
                </p>
                <div className={style.characteristics}>
                  <div className={style.characteristic}>
                    <p className={style.characteristicText}>Screen</p>
                    <p className={style.characteristicText}>Capacity</p>
                    <p className={style.characteristicText}>RAM</p>
                  </div>
                  <div className={style.characteristicItem}>
                    <p className={style.characteristicItemText}>
                      {product.screen}
                    </p>
                    <p className={style.characteristicItemText}>
                      {product.capacity}
                    </p>
                    <p className={style.characteristicItemText}>
                      {product.ram}
                    </p>
                  </div>
                </div>
                <div className={style.buttons}>
                  <button
                    type="button"
                    onClick={() => toggleCart(String(product.id))}
                    className={`${style.addButton} ${
                      cartIds.has(String(product.id))
                        ? style.addButtonClick
                        : ''
                    }`}
                  >
                    {cartIds.has(String(product.id)) ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className={`${style.likeButton} ${
                      likedIds.has(String(product.id))
                        ? style.likeButtonClick
                        : ''
                    }`}
                    onClick={() => toggleLike(String(product.id))}
                  >
                    {likedIds.has(String(product.id)) ? (
                      <img
                        className={style.imgLike}
                        src={`${import.meta.env.BASE_URL}/img/liked.png`}
                        alt="Liked"
                      />
                    ) : (
                      <img
                        className={style.imgLike}
                        src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
                        alt="Like"
                      />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};
