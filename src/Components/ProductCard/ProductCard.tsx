import React, { useContext, useMemo } from 'react';
import { ProductGeneral } from '../../types/ProductGeneral';
import './ProductCard.scss';
import { Link, useLocation } from 'react-router-dom';
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
  } = useContext(ProductContext);

  const { pathname } = useLocation();

  const getModifiedPathname = useMemo(() => {
    if (!product) {
      return '';
    }

    const parts = pathname.split('/').filter(Boolean);

    // Check if the current path is for a different category
    const currentCategory = parts[0];

    if (currentCategory && currentCategory !== product.category) {
      // If we're changing categories, we should use only the new category and product ID
      return `/${product.category}/${product.itemId}`;
    }

    // If we're in the same category or there's no category, proceed as before
    const pathWithoutIds = parts.filter(part => !part.includes('-'));

    // Ensure the category is in the path
    if (!pathWithoutIds.includes(product.category)) {
      pathWithoutIds.unshift(product.category);
    }

    // Add the current product's ID
    pathWithoutIds.push(product.itemId);

    return `/${pathWithoutIds.join('/')}`;
  }, [pathname, product]);

  const checkItemInCart = (card: ProductGeneral) => {
    return inCart.find(prod => prod === card);
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

  return (
    <>
      {product && (
        <div className="product-card">
          <Link to={getModifiedPathname} className="product-card__image">
            <img
              onClick={handleGeneralProduct}
              className="product-card__image--link"
              src={product.image}
            ></img>
          </Link>
          <Link to={getModifiedPathname} className="product-card__title">
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
              className={classNames('product-card__buttons--add', {
                'product-card__buttons--add--active': checkItemInCart(product),
              })}
            >
              Add to cart
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
