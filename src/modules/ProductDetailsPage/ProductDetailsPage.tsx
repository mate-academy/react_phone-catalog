/* eslint-disable */
import style from './ProductDetailsPage.module.scss';

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Autoplay, Thumbs } from 'swiper/modules';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductData } from '../../types/ProductData';
import { Loader } from '../../components/Loader';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hook';

import { client } from '../../utils/fetchClients';
import { init } from '../../features/products';
import productNotFound from '../../assets/img/notFound/product-not-found.png';
import classNames from 'classnames';
import { colorMap } from '../../utils/colorMap';
import { ButtonAddCart } from '../../components/ButtonAddCart';
import { HeartButton } from '../../components/HeartButton';
import { getSpecifications } from '../../services/getSpecification';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/Product';
import { getSuggestedProducts } from '../../services/getSuggestedProducts.ts';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;
  const category = location.split('/').slice(1, 2).join();
  const navigate = useNavigate();

  const products = useAppSelector(state => state.products.items);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const productFromRedux = products.find(item => item.itemId === productId);

  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(
    null,
  );
  const images = currentProduct ? [...currentProduct?.images] : null;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [thumbsDirection, setThumbsDirection] = useState<
    'vertical' | 'horizontal'
  >(window.innerWidth <= 639 ? 'horizontal' : 'vertical');

  useEffect(() => {
    const handleResize = () => {
      setThumbsDirection(window.innerWidth <= 639 ? 'horizontal' : 'vertical');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [loader, setLoader] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setLoader(true);
    client
      .get<ProductData[]>(`api/${category}.json`)
      .then(data => {
        const product = data.find(item => item.id === productId);

        setCurrentProduct(product || null);
      })
      .finally(() => setLoader(false));

    const fetchSuggestedProducts = async () => {
      const suggested = await getSuggestedProducts();

      setSuggestedProducts(suggested);
    };

    fetchSuggestedProducts();

    if (!products.length) {
      dispatch(init());
    }
  }, [category, dispatch, productId, products.length]);

  const updatePath = (newValue: string, type: 'color' | 'capacity') => {
    const splitedPath = location.split('-');

    const length = currentProduct
      ? currentProduct.color.split(' ').join('-').split('-').length
      : 0;

    if (type === 'color') {
      const pathWithoutColor = splitedPath.slice(0, -length);

      navigate(
        `${pathWithoutColor.join('-')}-${newValue.split(' ').join('-')}`,
        { replace: true },
      );
    }

    if (type === 'capacity') {
      splitedPath[splitedPath.length - length - 1] = newValue.toLowerCase();
      navigate(splitedPath.join('-'), { replace: true });
    }
  };

  const specifications = getSpecifications(currentProduct);

  return (
    <article className={style.productDetails}>
      <div className={style.breadcrumbs}>
        <Breadcrumbs name={productFromRedux?.name} />
      </div>

      <a className={style.backButton} onClick={() => navigate(`/${category}`)}>
        <div className={style.backButton__arrow} />
        <p className={style.backButton__text}>Back</p>
      </a>

      {loader && <Loader />}
      {!currentProduct && !loader && (
        <>
          <div className={style.pageNotFound}>
            <h1 className={style.pageNotFound__title}>Product was not found</h1>
            <img
              src={productNotFound}
              alt="Product not found"
              className={style.pageNotFound__img}
            />
          </div>
        </>
      )}

      {currentProduct && (
        <>
          <h1 className={style.title}>{currentProduct?.name}</h1>
          <div className={style.slider}>
            <Swiper
              modules={[Autoplay, Thumbs]}
              style={{ width: '100%' }}
              spaceBetween={100}
              centeredSlides={true}
              autoplay={{ delay: 5000 }}
              thumbs={{ swiper: thumbsSwiper }}
              onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
              className={style.mainImg}
            >
              {images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} className={style.slider__img} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={swiper => setThumbsSwiper(swiper)}
              slidesPerView={images?.length}
              spaceBetween={thumbsDirection === 'horizontal' ? 20 : 0}
              className={style.thumbs}
              direction={thumbsDirection}
              updateOnWindowResize={false}
            >
              <div className={style.slider__thumbsContainer}>
                {images?.map((image, index) => (
                  <SwiperSlide key={index} className={style.slider__slide}>
                    <img
                      src={image}
                      className={classNames(style.slider__thumbs, {
                        [style['slider__thumbs--active']]:
                          index === activeIndex,
                      })}
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>

          <div className={style.main}>
            <div className={style.selections}>
              <div className={style.colors}>
                <div className={style.colors__text}>
                  <p className={style.colors__text__avaibaleColors}>
                    Available colors
                  </p>
                  <p className={style.colors__text__id}>ID: 802390</p>
                </div>
                <ul className={style.colors__selection}>
                  {currentProduct.colorsAvailable.map(color => (
                    <li
                      key={color}
                      className={
                        color.split(' ').join('-').split('-').join(' ') ===
                        currentProduct.color
                          .split(' ')
                          .join('-')
                          .split('-')
                          .join(' ')
                          ? style['colors__selection__container--active']
                          : style.colors__selection__container
                      }
                      onClick={() => updatePath(color, 'color')}
                    >
                      <div
                        className={style.colors__selection__color}
                        style={{
                          backgroundColor: colorMap[color],
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className={style.divider} />

              <div className={style.capacity}>
                <p className={style.capacity__text}>
                  {currentProduct.category === 'accessories'
                    ? 'Select Size'
                    : 'Select capacity'}
                </p>
                <div className={style.capacity__size}>
                  {currentProduct.capacityAvailable.map(item => (
                    <p
                      key={item}
                      className={classNames(style.capacity__size__container, {
                        [style['capacity__size__container--active']]:
                          item === currentProduct.capacity,
                      })}
                      onClick={() => updatePath(item, 'capacity')}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className={style.divider} />
            </div>

            <div className={style.actions}>
              <div className={style.price}>
                <p className={style.price__discountPrice}>
                  ${currentProduct.priceDiscount}
                </p>
                <p className={style.price__fullPrice}>
                  ${currentProduct.priceRegular}
                </p>
              </div>
              <div className={style.buttonContainer}>
                <ButtonAddCart
                  productId={currentProduct.id}
                  className={style.buttonContainer__addToCart}
                />
                <HeartButton
                  productId={currentProduct.id}
                  className={style.buttonContainer__heart}
                />
              </div>
            </div>

            <div className={style.specification}>
              {specifications.map((spec, index) => (
                <div key={index} className={style.specification__item}>
                  <p className={style.specification__item__key}>{spec.key}</p>
                  <p className={style.specification__item__value}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <span className={style.id}>ID: 802390</span>

          <div className={style.about}>
            <h3 className={style.about__title}>About</h3>
            {currentProduct.description.map(item => (
              <div key={item.title} className={style.about__item}>
                <h4 className={style.about__item__title}>{item.title}</h4>
                <p className={style.about__item__description}>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={style.techSpecs}>
            <h3 className={style.techSpecs__title}>Tech specs</h3>

            <div className={style.characteristics}>
              {[
                {
                  key: 'Resolution',
                  value: currentProduct.resolution,
                },
                {
                  key: 'Processor',
                  value: currentProduct.processor,
                },
                { key: 'RAM', value: currentProduct.ram },
                {
                  key:
                    currentProduct.category === 'accessories'
                      ? 'Size'
                      : 'Built in memory',
                  value: currentProduct.capacity,
                },
                currentProduct.category !== 'accessories' && {
                  key: 'Camera',
                  value: currentProduct.camera,
                },
                { key: 'Zoom', value: 'Optical, 2x' },
                {
                  key: 'Cell',
                  value: currentProduct.cell.join(', '),
                },
              ]
                .filter((item): item is { key: string; value: string } =>
                  Boolean(item),
                )
                .map(({ key, value }) => (
                  <div key={key} className={style.characteristics__item}>
                    <div className={style.characteristics__item__key}>
                      {key}
                    </div>
                    <div className={style.characteristics__item__value}>
                      {value}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={style.productSlider}>
            <ProductSlider
              suggestedProducts={suggestedProducts}
              title={currentProduct ? 'You may also like' : 'Our bestsellers'}
              discount={true}
            />
          </div>
        </>
      )}
    </article>
  );
};
