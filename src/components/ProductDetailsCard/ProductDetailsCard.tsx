import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './productDetailsCard.scss';
import classNames from 'classnames';
import { Product } from '../../Types/Product';
import { Loader } from '../Loader/Loader';

import { ProductDetails } from '../../Types/ProductDetails';
import {
  getProductDetails,
  getSuggestedProducts,
  getProducts,
} from '../../api/request';
import { ProductSlider } from '../ProductSlider/ProductSlider';

import homeIcon from '../../img/Home.png';
import arrowRightGrey from '../../img/arrowRight.png';
import arrowLeftGrey from '../../img/arrowLeft.png';
import favoriteImg from '../../img/favourites.svg';
import redFavoritImg from '../../img/isfavorite.png';
import { ProductsContext } from '../ProductsContext/ProductsContext';

export const ProductDetailsCard = () => {
  const location = useLocation();
  const prevPage = location.pathname.split('/')[1];
  const currentProduct = location.pathname.split('/')[2];
  const [searchParams, setSearchParams] = useSearchParams();
  const [productDetails, setProductDetails] = useState<ProductDetails>(
    {} as ProductDetails,
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [currProduct, setCurrProduct] = useState<Product[]>([]);

  const currentLocation = location.pathname.split('-');
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { favoriteProducts, toggleFavorite, cartProducts, toggleCart } =
    useContext(ProductsContext);

  // eslint-disable-next-line
  const isFavorite = favoriteProducts.some(favorite => favorite.itemId === productDetails.id);
  // eslint-disable-next-line
  const isAddedToCart = cartProducts.some(cart => cart.itemId === productDetails.id);

  useEffect(() => {
    getProducts(prevPage).then(response => {
      setProducts(response);
    });
  }, [prevPage]);

  useEffect(() => {
    setCurrProduct(products.filter(item => item.phoneId === currentProduct));
  }, [products, currentProduct]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('itemId');

    setSearchParams(params);

    setIsLoading(true);
    getProductDetails(currentProduct)
      .then(response => {
        setProductDetails(response);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getSuggestedProducts().then(response => {
      setRandomProducts(response);
    });
  }, [searchParams, setSearchParams, currentProduct]);

  const moveToPrevPage = () => {
    return `/${prevPage}`;
  };

  const updateCurrentLocation =
    prevPage.slice(0, 1).toLocaleUpperCase() + prevPage.slice(1);

  const handleClickImg = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="product__navigation">
            <NavLink to="/">
              <img src={homeIcon} alt="home-icon" />
            </NavLink>
            <img src={arrowRightGrey} alt="arrow-icon" />
            <NavLink to={moveToPrevPage()}>
              <span className="product__navigation-path is-active">
                {updateCurrentLocation}
              </span>
            </NavLink>
            <img src={arrowRightGrey} alt="arrow-icon" />
            <span className="productDetails__current-product">
              {productDetails.name}
            </span>
          </div>

          <NavLink to={moveToPrevPage()} className="productDetails__back">
            <img src={arrowLeftGrey} alt="arrow-icon" />
            Back
          </NavLink>

          <div className="productDetails">
            <h2 className="productDetails__title">{productDetails.name}</h2>
            <div className="productDetails__top">
              <div className="productDetails__images">
                <div className="productDetails__left-images">
                  {productDetails.images?.map(image => {
                    return (
                      <button
                        key={image}
                        type="button"
                        className={classNames('productDetails__small-image', {
                          'productDetails__small-image--active':
                            selectedImage === image,
                        })}
                        onClick={() => handleClickImg(image)}
                      >
                        <img
                          key={image}
                          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
                          alt="product"
                          className="productDetails__small-img"
                        />
                      </button>
                    );
                  }, [])}
                </div>
                <div className="productDetails__right-image">
                  <img
                    src={`https://mate-academy.github.io/react_phone-catalog/_new/${selectedImage || productDetails.images?.[0]}`}
                    alt="product"
                    className="productDetails__right-img"
                  />
                </div>
              </div>
              <div className="productDetails__info">
                <div className="productDetails__colors">
                  <h3 className="productDetails__title-info">
                    Available colors
                  </h3>

                  <div className="productDetails__colors-items">
                    {productDetails.colorsAvailable?.map(color => {
                      const correctColor = (colorItem: string) => {
                        switch (colorItem) {
                          case 'black':
                            return 'rgb(31, 32, 32)';
                          case 'green':
                            return 'rgb(174, 225, 205)';
                          case 'yellow':
                            return 'rgb(243, 208, 96)';
                          case 'white':
                            return 'rgb(248, 247, 242)';
                          case 'purple':
                            return 'rgb(229, 221, 234)';
                          case 'red':
                            return 'rgb(186, 12, 46)';
                          case 'spacegray':
                            return 'rgb(83, 81, 80)';
                          case 'midnightgreen':
                            return 'rgb(0, 73, 83)';
                          case 'gold':
                            return 'rgb(249, 229, 201)';
                          case 'silver':
                            return 'rgb(226, 228, 225)';
                          default:
                            return 'rgb(31, 32, 32)';
                        }
                      };

                      return (
                        <NavLink
                          to={`${currentLocation.slice(0, -1).join('-')}-${color}`}
                          key={color}
                          className={classNames(
                            'productDetails__wrapper-color',
                            {
                              'productDetails__wrapper-color--active':
                                productDetails.color === color,
                            },
                          )}
                        >
                          <div
                            key={color}
                            className="productDetails__color"
                            style={{ backgroundColor: correctColor(color) }}
                          />
                        </NavLink>
                      );
                    })}
                  </div>
                </div>

                <div className="productDetails__decor-line" />

                <div className="productDetails__capacity">
                  <h3 className="productDetails__title-info">
                    Select capacity
                  </h3>
                  <div className="productDetails__capacity-items">
                    {productDetails.capacityAvailable?.map(capacity => {
                      return (
                        <NavLink
                          to={`${currentLocation.slice(0, -2).join('-')}-${capacity.toLowerCase()}-${currentLocation.slice(-1).join('-')}`}
                          key={capacity}
                          className={classNames(
                            'productDetails__wrapper-capacity',
                            {
                              'productDetails__wrapper-capacity--active':
                                productDetails.capacity === capacity,
                            },
                          )}
                        >
                          <span
                            key={capacity}
                            className="productDetails__capacity-item"
                          >
                            {capacity}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>

                <div className="productDetails__decor-line" />

                <div className="productDetails__price">
                  <div className="productDetails__price-items">
                    <span className="productDetails__price-discount">
                      ${productDetails.priceDiscount}
                    </span>
                    <span className="productDetails__price-regular">
                      ${productDetails.priceRegular}
                    </span>
                  </div>
                </div>
                {/* eslint-disable-next-line max-len */}
                <div className="productDetails__actions-btns product-card__btns">
                  <button
                    type="button"
                    className={classNames('productDetails__btn-cart btn', {
                      'productDetails__btn-cart--added': isAddedToCart,
                    })}
                    onClick={() =>
                      toggleCart({
                        ...currProduct[0],
                        quantity: 1,
                      })
                    }
                  >
                    {isAddedToCart ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className="productDetails__btn-favorites btn-arrows"
                    onClick={() => toggleFavorite(currProduct[0])}
                  >
                    <img
                      src={isFavorite ? redFavoritImg : favoriteImg}
                      alt="favoritesIcon"
                    />
                  </button>
                </div>

                <div className="productDetails__main-descr">
                  <div className="productDetails__main-wrapper-descr">
                    <div className="productDetails__subtitle-main">Screen</div>
                    <div className="productDetails__info-main">
                      {productDetails.screen}
                    </div>
                  </div>

                  <div className="productDetails__main-wrapper-descr">
                    <div className="productDetails__subtitle-main">
                      Resolution
                    </div>
                    <div className="productDetails__info-main">
                      {productDetails.resolution}
                    </div>
                  </div>

                  <div className="productDetails__main-wrapper-descr">
                    <div className="productDetails__subtitle-main">
                      Processor
                    </div>
                    <div className="productDetails__info-main">
                      {productDetails.processor}
                    </div>
                  </div>

                  <div className="productDetails__main-wrapper-descr">
                    <div className="productDetails__subtitle-main">Ram</div>
                    <div className="productDetails__info-main">
                      {productDetails.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="productDetails__content">
              <div className="productDetails__left-content">
                <h3 className="productDetails__title-content">About</h3>
                {productDetails.description?.map(({ title, text }) => {
                  return (
                    <div key={title} className="productDetails__descr-content">
                      <h4 className="productDetails__descr-subtitle">
                        {title}
                      </h4>
                      <div className="productDetails__descr-text">
                        {text.map(information => {
                          return (
                            <p
                              key={information}
                              className="productDetails__descr-item"
                            >
                              {information}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="productDetails__right-content">
                <h3 className="productDetails__title-content">Tech specs</h3>

                <div className="productDetails__tech-specs">
                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">Screen</div>
                    <div className="productDetails__info-tech">
                      {productDetails.screen}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">
                      Resolution
                    </div>
                    <div className="productDetails__info-tech">
                      {productDetails.resolution}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">
                      Processor
                    </div>
                    <div className="productDetails__info-tech">
                      {productDetails.processor}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">RAM</div>
                    <div className="productDetails__info-tech">
                      {productDetails.ram}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">
                      Built in memory
                    </div>
                    <div className="productDetails__info-tech">
                      {productDetails.capacity}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">Camera</div>
                    <div className="productDetails__info-tech">
                      {productDetails.camera}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">Zoom</div>
                    <div className="productDetails__info-tech">
                      {productDetails.zoom}
                    </div>
                  </div>

                  <div className="productDetails__tech-specs-wrapper">
                    <div className="productDetails__subtitle-tech">Cell</div>
                    <div className="productDetails__info-tech">
                      {productDetails.cell?.map(cell => {
                        return (
                          <p
                            key={cell}
                            // eslint-disable-next-line max-len
                            className="productDetails__info-tech productDetails__info-tech--values"
                          >
                            {cell}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="productDetails__random-products">
            <ProductSlider
              products={randomProducts}
              title="You may also like"
            />
          </div>
        </>
      )}
    </>
  );
};
