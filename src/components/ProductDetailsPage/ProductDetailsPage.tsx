import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ProductsContext } from '../../context/ProductsProvider';
import { ProductDetail } from '../../types/ProductDetail';
import { getProduct } from '../../api/api';
import { BreadCrumbs } from '../BreadCrumbs';
import { ProductsSlider } from '../ProductsSlider';
import { CartContext } from '../../context/CartProvider';
import { FavouriteContext } from '../../context/FavouriteProvider';
import { Loader } from '../Loader/Loader';
import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const { productId } = useParams();
  const product = products.find(item => (item.id === productId));

  const [productDetail, setProductDetail] = useState<ProductDetail | null>();

  let title = '';

  if (product) {
    title = `${product.type[0].toUpperCase() + product.type.slice(1)}s`;
  }

  const [bigFoto, setBigFoto] = useState(product?.imageUrl);

  // #region changeParams
  const colors = ['#fcdbc1', '#5f7170', '#4c4c4c', '#f0f0f0'];
  const [colorChoose, setColorChoose] = useState(colors[0]);

  const capacity = ['64GB', '256GB', '512GB'];
  const [capacityChoose, setCapacityChoose] = useState(capacity[0]);

  const onKeyPress = (eKey: string, param: string, value: string) => {
    if (eKey === 'Enter') {
      if (param === 'color') {
        setColorChoose(value);
      } else if (param === 'capacity') {
        setCapacityChoose(value);
      }
    }
  };
  // #endregion

  // #region YouMayAlsoLike
  let randomSortProducts = [...products];
  const getSuggestedProducts = () => {
    function compareRandom() {
      return Math.random() - 0.5;
    }

    randomSortProducts = [...products].sort(compareRandom);

    return randomSortProducts;
  };
  // #endregion

  // #region getCheckInCart, getCheckInFavorites
  const {
    addedToFavorites,
    removefromFavorites,
  } = useContext(FavouriteContext);

  const { addedToOrder, removeItem } = useContext(CartContext);

  const getCheckInCart = () => {
    if (product) {
      if (product.inOrder) {
        removeItem(product);
      } else {
        addedToOrder(product);
      }
    }
  };

  const getCheckInFavorites = () => {
    if (product) {
      if (product.inFavourite) {
        removefromFavorites(product);
      } else {
        addedToFavorites(product);
      }
    }
  };
  // #endregion

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getProduct(productId || '').then((data) => (
      setProductDetail(data)
    ));
    getSuggestedProducts();
  }, []);

  return (
    <div className="ProductDetailsPage">
      {!productDetail ? (
        <Loader />
      ) : (
        <>
          <BreadCrumbs
            url={`/${product?.type}s`}
            page={title}
            title={`${product?.name}`}
          />
          <button
            type="button"
            className="ProductDetailsPage__labelBack"
            data-cy="backButton"
            onClick={goBack}
          >
            <span className="BreadCrumbs__span">
              &#60;
            </span>
            Back
          </button>
          {product ? (
            <>
              <h1 className="ProductDetailsPage__title">{product.name}</h1>
              <div className="ProductDetailsPage__mainBlock">
                <div className="ProductDetailsPage__photos">
                  <ul className="ProductDetailsPage__allFotos">
                    {productDetail?.images.map(img => (
                      <li
                        key={img}
                        className={classNames(`ProductDetailsPage__smallFotoLi +
                        ${bigFoto === img ? 'ProductDetailsPage__smallFotoLi--active' : ''}`)}
                      >
                        <input
                          type="image"
                          src={img}
                          alt={img}
                          className="ProductDetailsPage__smallFoto"
                          onClick={() => setBigFoto(img)}
                        />
                      </li>
                    ))}
                  </ul>
                  <img
                    src={bigFoto}
                    className="ProductDetailsPage__bigFoto"
                    alt="product"
                  />
                </div>
                <div className="ProductDetailsPage__mainDetails">
                  <div className="ProductDetailsPage__options">
                    <div className="ProductDetailsPage__colors">
                      <p className="ProductDetailsPage__availableColors">
                        Available colors
                      </p>
                      <div className="ProductDetailsPage__chooseColor">
                        {colors.map(color => (
                          <label
                            htmlFor="color"
                            className={classNames(`ProductDetailsPage__label + ${color === colorChoose
                              ? 'ProductDetailsPage__label--active'
                              : ''
                            }`)}
                            style={{
                              backgroundColor: color,
                            }}
                          >
                            <input
                              type="radio"
                              id="color"
                              name="color"
                              className="ProductDetailsPage__inputColor"
                              value={colorChoose}
                            />
                            <div
                              className="ProductDetailsPage__decorColor"
                              onClick={() => setColorChoose(color)}
                              onKeyDown={
                                (event) => onKeyPress(event.key, 'color', color)
                              }
                              role="button"
                              tabIndex={0}
                              aria-label="change color"

                            />
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="ProductDetailsPage__capacity">
                      <p className="ProductDetailsPage__availableColors">
                        Select capacity
                      </p>
                      <div className="ProductDetailsPage__chooseCapacity">
                        {capacity.map(option => (
                          <label
                            htmlFor="capacity"
                            className={
                              classNames(`ProductDetailsPage__labelCapacity + ${option === capacityChoose
                                ? 'ProductDetailsPage__labelCapacity--active'
                                : ''
                              }`)
                            }
                          >
                            <input
                              type="radio"
                              id="capacity"
                              name="capacity"
                              className="ProductDetailsPage__inputCapacity"
                              value={capacityChoose}
                            />
                            <div
                              role="button"
                              className="ProductDetailsPage__decorCapacity"
                              onClick={() => setCapacityChoose(option)}
                              onKeyDown={
                                (event) => onKeyPress(
                                  event.key, 'capacity', option,
                                )
                              }
                              tabIndex={0}
                            >
                              {option}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="ProductDetailsPage__mainInfo">
                      <div className="ProductDetailsPage__priceBlock">
                        {product.discount > 0 ? (
                          <>
                            <p
                              className="ProductDetailsPage__priceWithDiscount"
                            >
                              &#36;
                              {product.priceWithDiscount}
                            </p>
                            <p className="ProductDetailsPage__price">
                              &#36;
                              {product.price}
                            </p>
                          </>
                        ) : (
                          <p className="ProductDetailsPage__priceWithDiscount">
                            &#36;
                            {product.price}
                          </p>
                        )}
                      </div>
                      <div className="ProductDetailsPage__add">
                        <button
                          type="button"
                          className={
                            classNames(`ProductDetailsPage__addToCart + ${product.inOrder
                              ? 'ProductDetailsPage__addToCart--added'
                              : ''
                            }`)
                          }
                          onClick={() => getCheckInCart()}
                          aria-label="add to cart"
                        >
                          {product.inOrder
                            ? 'Added to cart'
                            : 'Add to cart'}
                        </button>
                        <button
                          type="button"
                          data-cy="addToFavorite"
                          className={classNames(`ProductDetailsPage__addToFavorite + ${product.inFavourite
                            ? 'ProductDetailsPage__addToFavorite--added'
                            : ''
                          }`)}
                          onClick={() => getCheckInFavorites()}
                          aria-label="add to favourite"
                        />
                      </div>
                      <div className="ProductDetailsPage__infoBlock">
                        <div className="ProductDetailsPage__info">
                          <span className="ProductDetailsPage__info-name">
                            Screen
                          </span>
                          <span className="ProductDetailsPage__info-value">
                            {product.screen}
                          </span>
                        </div>
                        <div className="ProductDetailsPage__info">
                          <span className="ProductDetailsPage__info-name">
                            Resolution
                          </span>
                          <span className="ProductDetailsPage__info-value">
                            {productDetail?.display.screenResolution}
                          </span>
                        </div>
                        <div className="ProductDetailsPage__info">
                          <span className="ProductDetailsPage__info-name">
                            Processor
                          </span>
                          <span className="ProductDetailsPage__info-value">
                            {productDetail?.hardware.cpu}
                          </span>
                        </div>
                        {product?.ram && (
                          <div className="ProductDetailsPage__info">
                            <span className="ProductDetailsPage__info-name">
                              RAM
                            </span>
                            <span className="ProductDetailsPage__info-value">
                              {product?.ram}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="ProductDetailsPage__id">
                    id:
                    {productId}
                  </p>
                </div>
              </div>
              <div className="ProductDetailsPage__detailBlock">
                <div
                  className="ProductDetailsPage__about"
                  data-cy="productDescription"
                >
                  <h2 className="ProductDetailsPage__detailTitle">About</h2>
                  <h3 className="ProductDetailsPage__paragraph">
                    And then there was Pro
                  </h3>
                  <p className="ProductDetailsPage__text">
                    {productDetail?.description}
                  </p>
                </div>
                <div className="ProductDetailsPage__tech">
                  <h2 className="ProductDetailsPage__detailTitle">
                    Tech specs
                  </h2>
                  <div className="ProductDetailsPage__techBlock">
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Screen
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {product.screen}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Resolution
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.display.screenResolution}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Processor
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.hardware.cpu}
                      </span>
                    </div>
                    {product?.ram && (
                      <div className="ProductDetailsPage__techInfo">
                        <span className="ProductDetailsPage__tech-name">
                          RAM
                        </span>
                        <span className="ProductDetailsPage__tech-value">
                          {product?.ram}
                        </span>
                      </div>
                    )}
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Built in memory
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.storage.flash}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Camera
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.camera.primary}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Zoom
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.camera.features}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__techInfo">
                      <span className="ProductDetailsPage__tech-name">
                        Cell
                      </span>
                      <span className="ProductDetailsPage__tech-value">
                        {productDetail?.connectivity.cell}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1 className="ProductDetailsPage__title">Phone was not found</h1>
          )}

          <ProductsSlider
            title="You may also like"
            sortProducts={randomSortProducts}
          />
        </>
      )}
    </div>
  );
};
