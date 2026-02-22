import { Link } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import classNames from 'classnames';
import Product from '../../types/Product';
import { ProductsContext } from '../../Context/ProductsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import s from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const addProdToCart = useContextSelector(
    ProductsContext,
    ctx => ctx.addProdToCart,
  );
  const addProdToFavourites = useContextSelector(
    ProductsContext,
    ctx => ctx.addProdToFavourites,
  );
  const isProdInFavourites = useContextSelector(
    ProductsContext,
    ctx => ctx.isProdInFavourites,
  );
  const isProdInCart = useContextSelector(
    ProductsContext,
    ctx => ctx.isProdInCart,
  );

  function handleAddToCart() {
    addProdToCart(product);
  }

  function handleAddToFavourites() {
    addProdToFavourites(product);
  }

  return (
    <div className={`card ${s.product_card}`}>
      <div className="card_image mb-2">
        <Link to={`/product/${product.itemId}`}>
          <figure className={`image ${s.img_figure}`}>
            <img
              className={s.card_img}
              src={`/${product.image}`}
              alt={product.name}
            />
          </figure>
        </Link>
      </div>
      <div className="card-content px-0 py-1 is-flex-grow-1">
        <div className="media mb-0">
          <div className={`media-content block ${s.bottom_bordered}`}>
            <Link to={`/product/${product.itemId}`}>
              <p className={`${s.product_name}`}>{product.name}</p>
            </Link>
            <b className="is-size-5 has-text-weight-extrabold mr-2">
              ${product.price}
            </b>
            <del
              className={`is-size-5 has-text-weight-semibold ${s.product_gray}`}
            >
              ${product.fullPrice}
            </del>
          </div>
        </div>

        <div className="content mb-4">
          <ul className="list m-0">
            <li className="is-flex is-justify-content-space-between mb-2">
              <span
                className={`is-size-7 has-text-weight-bold ${s.product_gray}`}
              >
                Screen
              </span>
              <b className="is-size-7">{product.screen}</b>
            </li>
            <li className="is-flex is-justify-content-space-between mt-0 mb-2">
              <span
                className={`is-size-7 has-text-weight-bold ${s.product_gray}`}
              >
                Capacity
              </span>
              <b className="is-size-7">{product.capacity}</b>
            </li>
            <li className="is-flex is-justify-content-space-between mt-0">
              <span
                className={`is-size-7 has-text-weight-bold ${s.product_gray}`}
              >
                RAM
              </span>
              <b className="is-size-7">{product.ram}</b>
            </li>
          </ul>
        </div>
      </div>

      <div className="content is-flex is-justify-content-center mt-auto">
        <button
          className={classNames('button mr-2', {
            [`${s.cart_button}`]: !isProdInCart(product),
            [`${s.cart_button__active}`]: isProdInCart(product),
          })}
          type="button"
          onClick={handleAddToCart}
        >
          {isProdInCart(product) ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`button ${s.fav_button}`}
          type="button"
          onClick={handleAddToFavourites}
        >
          <span
            className={classNames('icon', {
              [`${s.blue_icon}`]: isProdInFavourites(product),
            })}
          >
            <FontAwesomeIcon
              icon={isProdInFavourites(product) ? faHeartSolid : faHeart}
            />
          </span>
        </button>
      </div>
    </div>
  );
};
