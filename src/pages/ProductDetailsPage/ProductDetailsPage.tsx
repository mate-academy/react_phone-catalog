/* eslint-disable max-len */
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Button } from '../../components/Button/Button';
import { ButtonType } from '../../helpers/types/ButtonType';
import { Loader } from '../../components/Loader/Loader';
import { GoBack } from '../../components/GoBack/GoBack';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { addToCart } from '../../store/slices/cartSlice';
import { addToFavorites, deleteFromFavorites } from '../../store/slices/favSlice';
import { fetchProductDetails } from '../../store/slices/productDetailsSlice';
import { ParamType } from '../../helpers/types/ParamType';
import { getCorrectParam } from '../../helpers/functionService/getCorrectParams';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductsCardType } from '../../helpers/types/ProductsCardType';
import { useColors } from '../../helpers/functionService/colors';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const { itemId = '' } = useParams();
  const navigate = useNavigate();
  const { productDetails, isLoading, hasError } = useAppSelector(
    (state) => state.productDetails,
  );
  const { favorites } = useAppSelector((state) => state.favorites);
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useDispatch();
  const colors = useColors();

  const hasInFavorites = useMemo(() => {
    return favorites.some((fav) => fav.itemId === itemId);
  }, [favorites, itemId]);

  const hasInCart = useMemo(() => {
    return cartItems.some((item) => item.product.itemId === itemId);
  }, [cartItems, itemId]);

  const handleGetParam = useCallback(
    (newParam: string, type: ParamType) => {
      navigate(`../${getCorrectParam(itemId, newParam, type)}`);
    },
    [itemId],
  );

  const handleAddToCart = useCallback(() => {
    if (hasInCart) {
      return;
    }

    const foundProduct = products.find(
      (product) => product.itemId === productDetails?.id,
    );

    if (foundProduct) {
      dispatch(addToCart(foundProduct));
    }
  }, [productDetails, products, hasInCart]);

  const handleFavoritesChange = useCallback(() => {
    const foundProduct = products.find(
      (product) => product.itemId === productDetails?.id,
    );

    if (hasInFavorites && foundProduct) {
      dispatch(deleteFromFavorites(foundProduct.id));
    } else if (foundProduct) {
      dispatch(addToFavorites(foundProduct));
    }
  }, [productDetails, products, hasInFavorites]);

  useEffect(() => {
    dispatch(fetchProductDetails(itemId));
  }, [itemId]);

  return (
    <div className="page container product">
      <div className="page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="page__go-back">
        <GoBack />
      </div>

      {isLoading && <Loader />}

      <h1 className="productDetails__title">
        {!isLoading && hasError
          ? 'Phone was not found'
          : productDetails?.name}
      </h1>

      {!isLoading && !hasError && productDetails && (
        <>
          <div className="productDetails__wrapper grid grid--block">
            <div
              className="
                productDetails__image-main
                grid__item--tablet-2-7
                grid__item--desktop-3-12
              "
            >
              <img
                src={`_new/${productDetails.images[imgIndex]}`}
                alt="main-img"
              />
            </div>

            <aside
              className="
                productDetails__thumbs
                grid__item--tablet-1-1
                grid__item--desktop-1-2
              "
            >
              <ul>
                {productDetails.images.map((imgSrc, index) => (
                  <li key={imgSrc}>
                    <Button
                      content={ButtonType.IMAGE}
                      onClick={() => setImgIndex(index)}
                      className={classNames('productDetails__thumbs-button', {
                        active: imgIndex === index,
                      })}
                    >
                      <img src={`_new/${imgSrc}`} alt="thumb" />
                    </Button>
                  </li>
                ))}
              </ul>
            </aside>

            <div
              className="
                productDetails__actions
                grid__item--tablet-8-12
                grid__item--desktop-14-20
              "
            >
              <div className="productDetails__actions-section">
                <p>Available colors</p>

                <ul>
                  {productDetails.colorsAvailable.map((color) => {
                    return (
                      <li key={color}>
                        <Button
                          content={ButtonType.COLOR}
                          className={classNames({
                            active: productDetails.color === color,
                          })}
                          onClick={() => handleGetParam(color, ParamType.COLOR)}
                        >
                          <span
                            style={{ backgroundColor: colors.get(color) }}
                          />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="productDetails__actions-section">
                <p>Select capacity</p>

                <ul>
                  {productDetails.capacityAvailable.map((capacity) => {
                    return (
                      <li key={capacity}>
                        <Button
                          content={ButtonType.NUMBER}
                          className={classNames(
                            'productDetails__actions-number', {
                              active: productDetails.capacity === capacity,
                            },
                          )}
                          onClick={() => handleGetParam(
                            capacity,
                            ParamType.CAPACITY,
                          )}
                        >
                          {capacity}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="productDetails__prices">
                <span className="productDetails__prices-main">
                  {`$${productDetails.priceDiscount}`}
                </span>

                <span className="productDetails__prices-discount">
                  {`$${productDetails.priceRegular}`}
                </span>
              </div>

              <div className="productDetails__buttons">
                <Button
                  content={ButtonType.TEXT}
                  className={classNames({ active: hasInCart })}
                  onClick={handleAddToCart}
                >
                  {hasInCart ? 'Added to cart' : 'Add to cart'}
                </Button>

                <Button
                  content={ButtonType.FAVORITES}
                  className={classNames({ active: hasInFavorites })}
                  onClick={handleFavoritesChange}
                />
              </div>

              <ul className="productDetails__info">
                <li className="productDetails__text">
                  <span className="productDetails__text-title">Screen</span>
                  <span className="productDetails__text-value">
                    {productDetails.screen}
                  </span>
                </li>

                <li className="productDetails__text">
                  <span className="productDetails__text-title">Resolution</span>
                  <span className="productDetails__text-value">
                    {productDetails.resolution}
                  </span>
                </li>

                <li className="productDetails__text">
                  <span className="productDetails__text-title">Processor</span>
                  <span className="productDetails__text-value">
                    {productDetails.processor}
                  </span>
                </li>

                <li className="productDetails__text">
                  <span className="productDetails__text-title">RAM</span>
                  <span className="productDetails__text-value">
                    {productDetails.ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="productDetails__wrapper grid grid--block"
            data-cy="productDescription"
          >
            <div
              className="
                productDetails__block
                grid__item--tablet-1-12
                grid__item--desktop-1-12
              "
            >
              <h2 className="productDetails__subtitle">About</h2>

              {productDetails.description.map((description) => (
                <div
                  className="productDetails__description"
                  key={description.title}
                >
                  <h3>{description.title}</h3>
                  {description.text.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="
                productDetails__block
                grid__item--tablet-1-12
                grid__item--desktop-14-24
              "
            >
              <h2 className="productDetails__subtitle">Tech specs</h2>

              <ul className="productDetails__info">
                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">Screen</span>
                  <span className="productDetails__specs-value">
                    {productDetails.screen}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">
                    Resolution
                  </span>
                  <span className="productDetails__specs-value">
                    {productDetails.resolution}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">Processor</span>
                  <span className="productDetails__specs-value">
                    {productDetails.processor}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">RAM</span>
                  <span className="productDetails__specs-value">
                    {productDetails.ram}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">
                    Built in memory
                  </span>
                  <span className="productDetails__specs-value">
                    {productDetails.capacity}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">Camera</span>
                  <span className="productDetails__specs-value">
                    {productDetails.camera}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">Zoom</span>
                  <span className="productDetails__specs-value">
                    {productDetails.zoom}
                  </span>
                </li>

                <li className="productDetails__specs">
                  <span className="productDetails__specs-title">Cell</span>
                  <span className="productDetails__specs-value">
                    {productDetails.cell.join(', ')}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <ProductsSlider
            type={ProductsCardType.SIMILAR}
            // filterBy="screen"
            // filterValue={productDetails.screen}
          />
        </>
      )}
    </div>
  );
};
