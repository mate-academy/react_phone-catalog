import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import './CardPage.scss';
import Breadcrumbs from '../../components/ui/Breadcrumbs/Breadcrumbs';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Category, ProductDetails } from '../../types';
import { useEffect, useState, useMemo } from 'react';
import { getProductDetails } from '../../api/client';
import { useAppState, useDispatch } from '../../store/Store';
import { Icon } from '../../components/ui/Icon/Icon';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Button, ColorButton } from '../../components/ui/Button/Button';
import ProductsSlider from '../../components/ui/ProductsSlider/ProductsSlider';

export default function CardPage() {
  const { catalog, id } = useParams();
  const { products, favorites } = useAppState();
  const storeData = useAppState();
  const dispatch = useDispatch();
  const suggestedProducts = useMemo(() => {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  function isCategory(value: string | undefined): value is Category {
    return value === 'phones' || value === 'tablets' || value === 'accessories';
  }

  useEffect(() => {
    if (isCategory(catalog) && id) {
      getProductDetails(catalog, id).then(
        data => data && setProductDetails(data),
      );
    }
  }, [catalog, id]);

  if (!id || !products.some(item => item.itemId === id)) {
    return <NotFoundPage />;
  }

  // Использование
  if (!isCategory(catalog)) {
    return <NotFoundPage />;
  }

  const getIdProduct = (idProduct: string): number | undefined => {
    return products.find(item => item.itemId === idProduct)?.id;
  };

  const isInCart = storeData.cartItems.find(
    item => productDetails?.id === item.id,
  );

  return (
    <div className="CardPage">
      <div className="CardPage__wrapper">
        <div className="CardPage__breadcrumbs">
          <Breadcrumbs category={catalog} productName={productDetails?.name} />
        </div>
        <div className="CardPage__back" onClick={() => goBack()}>
          <Icon name="arrow-left" />
          <button className="CardPage__backbtn">Back</button>
        </div>
        <div className="CardPage__title">{productDetails?.name}</div>

        <div className="CardPage__grid">
          <div className="CardPage__left">
            <div className="CardPage__gallery">
              <div className="CardPage__slider">
                <Swiper
                  slidesPerView={1}
                  onSlideChange={swiper => {
                    setActiveIndex(swiper.activeIndex);
                  }}
                  onSwiper={setSwiperRef}
                >
                  {productDetails?.images.map(productImagesSrc => {
                    return (
                      <SwiperSlide key={productImagesSrc}>
                        <img
                          src={productImagesSrc}
                          alt={productDetails?.name}
                          className="CardPage__slider--img"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>

                <div className="CardPage__allphotos">
                  {productDetails?.images.map((productImagesSrc, index) => {
                    return (
                      <img
                        key={productImagesSrc}
                        src={productImagesSrc}
                        alt={productDetails.name}
                        className={classNames('CardPage__allphotos--item', {
                          active: activeIndex === index,
                        })}
                        onClick={() => {
                          setActiveIndex(index);
                          swiperRef?.slideTo(index);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="CardPage__about">
              <h3 className="CardPage__about-title">About</h3>
              {productDetails?.description.map(desc => (
                <div className="CardPage__description" key={desc.title}>
                  <h4 className="CardPage__description-title">{desc.title}</h4>
                  {desc.text.map(text => (
                    <p className="CardPage__description-text" key={text}>
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="CardPage__right">
            <div className="CardPage__info">
              <div className="CardPage__colors">
                <div className="CardPage__colorswrapper">
                  <div className="CardPage__avaliablecolors">
                    <h6 className="CardPage__titleh6">Available colors</h6>
                    <div className="CardPage__selectcolor">
                      {productDetails?.colorsAvailable.map(color => {
                        const oldColorSlug = productDetails.color
                          .toLowerCase()
                          .replace(/ /g, '-');
                        const newColorSlug = color
                          .toLowerCase()
                          .replace(/ /g, '-');

                        const newId = productDetails.id.replace(
                          oldColorSlug,
                          newColorSlug,
                        );

                        return (
                          <Link key={color} to={`/${catalog}/${newId}`}>
                            <ColorButton
                              color={color}
                              selected={color === productDetails.color}
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="CardPage__idproduct">
                    <div className="CardPage__id">
                      id:{getIdProduct(productDetails?.id || '')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="CardPage__capacity">
                <h6 className="CardPage__titleh6">Select capacity</h6>
                <div className="CardPage__capacities">
                  {productDetails?.capacityAvailable.map(capacity => {
                    const oldCapacitySlug =
                      productDetails.capacity.toLowerCase();
                    const newCapacitySlug = capacity.toLowerCase();

                    const newId = productDetails.id.replace(
                      oldCapacitySlug,
                      newCapacitySlug,
                    );

                    return (
                      <Link
                        key={capacity}
                        to={`/${catalog}/${newId}`}
                        className={classNames('CardPage__capacity-link', {
                          'CardPage__capacity-link--active':
                            capacity === productDetails.capacity,
                        })}
                      >
                        {capacity}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="CardPage__price">
                <div className="CardPage__price-discount">
                  ${productDetails?.priceDiscount}
                </div>
                <div className="CardPage__price-full">
                  ${productDetails?.priceRegular}
                </div>
              </div>

              <div className="CardPage__addtocard">
                {isInCart ? (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: productDetails?.id || '',
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch({
                        type: 'ADD_TO_CART',
                        payload: productDetails?.id || '',
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                )}
                <Button
                  variant="square"
                  onClick={() =>
                    dispatch({
                      type: 'TOGGLE_FAVORITE',
                      payload: productDetails?.id || '',
                    })
                  }
                >
                  <Icon
                    name="heart"
                    filled={favorites.some(item => {
                      return item === productDetails?.id;
                    })}
                  />
                </Button>
              </div>

              <div className="CardPage__product-details">
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">Screen</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.screen}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">
                    Resolution
                  </span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.resolution}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">
                    Processor
                  </span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.processor}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">RAM</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.ram}
                  </span>
                </div>
              </div>
            </div>

            <div className="CardPage__tech-specs">
              <h3 className="CardPage__tech-specs-title">Tech specs</h3>
              <div className="CardPage__specs-list">
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">Screen</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.screen}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">
                    Resolution
                  </span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.resolution}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">
                    Processor
                  </span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.processor}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">RAM</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.ram}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">
                    Built in memory
                  </span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.capacity}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">Camera</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.camera}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">Zoom</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.zoom}
                  </span>
                </div>
                <div className="CardPage__product-detail">
                  <span className="CardPage__product-detail-name">Cell</span>
                  <span className="CardPage__product-detail-value">
                    {productDetails?.cell?.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="CardPage__alsolike">
          <ProductsSlider
            title="You May Also Like"
            products={suggestedProducts}
          />
        </div>
      </div>
    </div>
  );
}
