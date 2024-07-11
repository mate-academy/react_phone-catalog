import React, { useContext, useMemo } from 'react';
import { ProductGeneral } from '../../types/ProductGeneral';
import './ProductCard.scss';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';
import { getDetailedItems } from '../../api/DetailedProduct';

type Props = {
  product: ProductGeneral | null;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addProductToFavourites,
    inFavourites,
    onSelectedProduct,
    onLoading,
    inCart,
    addProductToCart,
    removeProductFromCart,
  } = useContext(ProductContext);

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const getModifiedPathname = useMemo(() => {
    if (!product) {
      return '';
    }

    const parts = pathname.split('/').filter(Boolean);

    const currentCategory = parts[0];

    if (currentCategory && currentCategory !== product.category) {
      return `/${product.category}/${product.itemId}`;
    }

    const pathWithoutIds = parts.filter(part => !part.includes('-'));

    if (!pathWithoutIds.includes(product.category)) {
      pathWithoutIds.unshift(product.category);
    }

    pathWithoutIds.push(product.itemId);

    return `/${pathWithoutIds.join('/')}`;
  }, [pathname, product]);

  const checkItemInCart = (card: ProductGeneral) => {
    return inCart.find(prod => prod.id === card.id);
  };

  const checkLikedItem = (card: ProductGeneral) => {
    return inFavourites.find(prod => prod === card);
  };

  const handleGeneralProduct = async () => {
    window.scrollTo(0, 0);
    onLoading(true);
    if (product) {
      const productGeneral = await getDetailedItems(product.category);
      const data = productGeneral.find(item => item.id === product.itemId);

      if (data) {
        onSelectedProduct(data);
      }
    }
  };

  const handleAddButton = (value: ProductGeneral) => {
    const valueInCart = inCart.find(val => val.id === value.id);

    if (!valueInCart) {
      addProductToCart(value);
    } else {
      removeProductFromCart(value);
    }
  };

  return (
    <>
      {product && (
        <div className="product-card">
          <Link
            to={getModifiedPathname}
            state={{ search: searchParams.toString(), pathname }}
            className="product-card__image"
          >
            <img
              alt={`${product.name} image`}
              onClick={handleGeneralProduct}
              className="product-card__image--link"
              src={product.image}
            ></img>
          </Link>
          <Link
            to={getModifiedPathname}
            onClick={handleGeneralProduct}
            state={{ search: searchParams.toString(), pathname }}
            className="product-card__title"
          >
            {product.name}
          </Link>
          <div className="product-card__prices">
            <p className="product-card__prices--low">${product.price}</p>
            <p className="product-card__prices--full">${product.fullPrice}</p>
          </div>

          <div className="product-card__border"></div>
          <div className="product-card__specs">
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">Screen</p>
              <p className="product-card__specs--item_description">
                {product.screen}
              </p>
            </div>
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">Capacity</p>
              <p className="product-card__specs--item_description">
                {product.capacity}
              </p>
            </div>
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">RAM</p>
              <p className="product-card__specs--item_description">
                {product.ram}
              </p>
            </div>
          </div>
          <div className="product-card__buttons">
            <button
              onClick={() => handleAddButton(product)}
              className={classNames('product-card__buttons--add', {
                'product-card__buttons--add--active': checkItemInCart(product),
              })}
            >
              {!checkItemInCart(product) ? 'Add to cart' : 'Added'}
            </button>
            <div
              className="product-card__buttons--wrapper"
              onClick={() => addProductToFavourites(product)}
            >
              <button
                className={classNames('details__button--like__link', {
                  'details__button--like__link__active':
                    checkLikedItem(product),
                })}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
