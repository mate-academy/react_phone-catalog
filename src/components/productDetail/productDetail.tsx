/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useMemo, useState } from 'react';
import styles from './productDetail.module.scss';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { handleAddToFavorites } from '../../app/services/functions';
import { handleAddToCart } from '../../app/services/handleAddCartItem';
import { CircleLoader } from 'react-spinners';
import { fetchPhones, resetStatus } from '../../features/phones';
import { fetchTablets } from '../../features/tablets';
import { fetchAccessories } from '../../features/accessories';
import { setName } from '../../features/productName';
import { ProductCardHome } from '../productCardHome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Product } from '../../types/Product';
import { ProductNotFound } from '../productNotFound';

export const ProductDetail: React.FC = () => {
  const { itemId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state: RootState) => state.cart.items);
  const allProducts = useSelector((state: RootState) => state.products.items);
  const shuffledProducts = useMemo(() => {
    return [...allProducts].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [allProducts]);

  let selectedProduct = useSelector((state: RootState) =>
    state.phones.items.find(phone => phone.id === itemId),
  );
  const selectedTablet = useSelector((state: RootState) =>
    state.tablets.items.find(tablet => tablet.id === itemId),
  );

  const selectedAccess = useSelector((state: RootState) =>
    state.accessories.items.find(acces => acces.id === itemId),
  );

  if (selectedTablet) {
    selectedProduct = selectedTablet;
  }

  if (selectedAccess) {
    selectedProduct = selectedAccess;
  }

  let status;
  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);
  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );

  if (selectedProduct?.category === 'phones') {
    status = statusPhones;
  } else if (selectedProduct?.category === 'tablets') {
    status = statusTablets;
  } else if (selectedProduct?.category === 'accessories') {
    status = statusAccessories;
  } else {
    status = 'loading';
  }

  const favoritesProducts = useSelector(
    (state: RootState) => state.favorite.items,
  );

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetStatus());
    if (selectedProduct?.category === 'phones') {
      dispatch(fetchPhones());
    }

    if (selectedProduct?.category === 'tablets') {
      dispatch(fetchTablets());
    }

    if (selectedProduct?.category === 'accessories') {
      dispatch(fetchAccessories());
    }
  }, [dispatch, selectedProduct?.category]);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);

  const handleImageClick = (image: string | undefined) => {
    setMainImage(image);
  };

  const handleFavoriteClick = () => {
    if (selectedProduct) {
      handleAddToFavorites(
        selectedProduct.id,
        String(selectedProduct.id),
        selectedProduct.images[0],
        selectedProduct.name,
        selectedProduct.priceDiscount,
        selectedProduct.priceRegular,
        selectedProduct.screen,
        selectedProduct.capacity,
        selectedProduct.ram,
        selectedProduct.category,

        favoritesProducts,
        dispatch,
      );
    }
  };

  const handleCartClick = () => {
    if (selectedProduct) {
      handleAddToCart(
        selectedProduct.id,
        String(selectedProduct.id),
        selectedProduct.images[0],
        selectedProduct.name,
        selectedProduct.priceDiscount,
        selectedProduct.category,
        1,
        cartProducts,
        dispatch,
      );
    }
  };

  if (selectedProduct) {
    dispatch(setName(selectedProduct.name));
  }

  // if (!selectedProduct) {
  //   return <p>Продукт не найден. Пожалуйста, проверьте URL.</p>;
  // }

  const handleCapacityClick = (capacity: string) => {
    const select = selectedProduct?.id;
    const memory = capacity.toLocaleLowerCase();

    const selectString =
      typeof select === 'number' ? select.toString() : select;

    if (!selectString) {
      return;
    }

    const selectParts = selectString?.split('-');

    if (selectedProduct?.category === 'phones') {
      selectParts[selectParts.length - 2] = memory;
    }

    if (selectedProduct?.category === 'tablets') {
      selectParts[5] = memory;
    }

    if (
      selectedProduct?.category === 'accessories' &&
      selectParts?.length === 7
    ) {
      selectParts[4] = memory;
    }

    if (
      selectedProduct?.category === 'accessories' &&
      selectParts?.length === 6
    ) {
      selectParts[4] = memory;
    }

    if (
      selectedProduct?.category === 'accessories' &&
      selectParts?.length === 5
    ) {
      selectParts[3] = memory;
    }

    const newSelect = selectParts?.join('-');

    navigate(`/${selectedProduct?.category}/${newSelect}`);
  };

  const handleColorClick = (color: string) => {
    const select = selectedProduct?.id;
    let color1 = color.toLowerCase();
    const selectColors =
      typeof select === 'number' ? select.toString() : select;

    if (!selectColors) {
      return;
    }

    if (color1.split(' ').length === 2) {
      color1 = color1.split(' ').join('-');
    }

    const selectParts = selectColors.split('-');

    selectParts[selectParts.length - 1] = color1;
    if (
      selectedProduct?.category === 'accessories' &&
      selectParts.length === 7
    ) {
      selectParts.pop();
      selectParts[selectParts.length - 1] = color1;
    }

    const newColor = selectParts.join('-');

    navigate(`/${selectedProduct?.category}/${newColor}`);
  };

  const back = () => {
    navigate(-1);
  };

  const handleProductClick = (selectet: Product) => {
    navigate(`/${selectet.category}/${selectet.itemId}`);
  };

  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (!selectedProduct) {
      timer = setTimeout(() => {
        setShowNotFound(true);
      }, 2000);
    } else {
      setShowNotFound(false);
      if (timer) {
        clearTimeout(timer);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectedProduct]);

  return (
    <>
      {!selectedProduct && showNotFound ? (
        <ProductNotFound />
      ) : (
        <>
          <span onClick={back} className={styles.back}>
            Back
          </span>
          {status === 'loading' ? (
            <div className={styles.loader}>
              <CircleLoader size={150} color="#1c5a9b" />
            </div>
          ) : (
            <div className={classNames(styles.product)}>
              <h2>{selectedProduct?.name}</h2>
              <div className={styles.tablet_container}>
                <div className={styles.tablet_container2}>
                  <img
                    src={mainImage}
                    className={styles.product_img}
                    alt={selectedProduct?.name}
                  />
                  <div className={styles.product_img_container}>
                    {selectedProduct?.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        onClick={() => handleImageClick(image)}
                        className={classNames({
                          [styles.product_imgs]: true,
                          [styles.black]: image === mainImage,
                        })}
                        alt="Thumbnail"
                        onError={e => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p>
                    Available colors <span>ID: 843256</span>
                  </p>
                  <ul className={styles.product_colors}>
                    {selectedProduct?.colorsAvailable.map((color, index) => (
                      <li
                        key={index}
                        className={classNames({
                          [styles.product_colors_item]: true,
                          [styles.black]: selectedProduct.color === color,
                        })}
                      >
                        <span
                          onClick={() => handleColorClick(color)}
                          className={styles.product_colors_link}
                          style={{
                            backgroundColor:
                              color === 'midnight' ? 'black' : color,
                          }}
                        ></span>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.product_capacity_div}>
                    <p className={styles.product_capacity_text}>
                      Select capacity
                    </p>
                    <ul className={styles.product_capacity}>
                      {selectedProduct?.capacityAvailable.map(
                        (capacity, index) => (
                          <li
                            key={index}
                            className={styles.product_capacity_item}
                          >
                            <span
                              onClick={() => handleCapacityClick(capacity)}
                              className={classNames({
                                [styles.product_capacity_link]: true,
                                [styles.black_capacity]:
                                  selectedProduct.capacity === capacity,
                              })}
                            >
                              {capacity}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <section className={styles.buy}>
                    <p className={styles.buy_priceD}>
                      ${selectedProduct?.priceDiscount}
                      <span className={styles.buy_priceR}>
                        ${selectedProduct?.priceRegular}
                      </span>
                    </p>

                    <div className={styles.buy_buttonDiv}>
                      <button
                        className={classNames(styles.buy_buttonBuy, {
                          [styles.buyed]: cartProducts.some(product =>
                            product.itemId
                              ? product.itemId === selectedProduct?.id
                              : product.id === itemId,
                          ),
                        })}
                        onClick={handleCartClick}
                      >
                        {cartProducts.some(product =>
                          product.itemId
                            ? product.itemId === selectedProduct?.id
                            : product.id === itemId,
                        )
                          ? 'Added to cart'
                          : 'Add to cart'}
                      </button>
                      <button
                        className={styles.buy_favor}
                        onClick={handleFavoriteClick}
                      >
                        <span
                          className={classNames(
                            favoritesProducts.some(product =>
                              product.itemId
                                ? product.itemId === selectedProduct?.id
                                : product.id === itemId,
                            )
                              ? styles.filled_heart
                              : styles.buy_favor_icon,
                          )}
                        ></span>
                      </button>
                    </div>
                    <div className={styles.buy_text_cont}>
                      <p className={styles.buy_text}>
                        Screen
                        <span className={styles.buy_span}>
                          {selectedProduct?.screen
                            .split(' ')
                            .slice(0, 2)
                            .join(' ')}
                        </span>
                      </p>
                      <p className={styles.buy_text}>
                        Resolution
                        <span className={styles.buy_span}>
                          {selectedProduct?.resolution}
                        </span>
                      </p>
                      <p className={styles.buy_text}>
                        Processor
                        <span className={styles.buy_span}>
                          {selectedProduct?.processor}
                        </span>
                      </p>
                      <p className={styles.buy_text}>
                        RAM{' '}
                        <span className={styles.buy_span}>
                          {selectedProduct?.ram}
                        </span>
                      </p>
                    </div>
                  </section>
                </div>
              </div>

              {/* About section */}
              <div className={styles.tablet_contaier3}>
                <section className={styles.about}>
                  <h3 className={styles.about_title}>About</h3>

                  {selectedProduct?.description.map((describe, index) => (
                    <React.Fragment key={index}>
                      <h3 className={styles.about_describe}>
                        {describe.title}
                      </h3>
                      <p className={styles.about_text}>{describe.text}</p>
                    </React.Fragment>
                  ))}
                </section>
                <section className={styles.spec}>
                  <h3 className={styles.spec_title}>Tech specs</h3>
                  <ul className={styles.spec_list}>
                    <li className={styles.spec_item}>
                      Screen
                      <span className={styles.spec_span}>
                        {selectedProduct?.screen}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Resolution
                      <span className={styles.spec_span}>
                        {selectedProduct?.resolution}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Processor
                      <span className={styles.spec_span}>
                        {selectedProduct?.processor}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      RAM
                      <span className={styles.spec_span}>
                        {selectedProduct?.ram}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Built in memory
                      <span className={styles.spec_span}>
                        {selectedProduct?.capacity}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Camera
                      <span className={styles.spec_span}>
                        {selectedProduct?.camera}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Zoom
                      <span className={styles.spec_span}>
                        {selectedProduct?.zoom}
                      </span>
                    </li>
                    <li className={styles.spec_item}>
                      Cell
                      <span className={styles.spec_span}>
                        {selectedProduct?.cell.join(', ')}
                      </span>
                    </li>
                  </ul>
                </section>
              </div>
              <div className={styles.hot_cont}>
                <h2>Hot prices</h2>
                <div className={styles.hot_buttons}>
                  <button id="myPrevHot" className={styles.hot_buttonPrev} />
                  <button id="myNextHot" className={styles.hot_buttonNext} />
                </div>
              </div>
              <Swiper
                slidesPerView={1.4}
                centeredSlides={false}
                slidesPerGroupSkip={1}
                grabCursor={true}
                keyboard={{
                  enabled: true,
                }}
                spaceBetween={16}
                breakpoints={{
                  640: {
                    slidesPerView: 2.4,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                  },
                  1200: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 16,
                  },
                }}
                navigation={{
                  nextEl: '#myNextHot',
                  prevEl: '#myPrevHot',
                }}
                modules={[Navigation]}
                className="mySwiper"
              >
                {shuffledProducts.slice(0, 10).map(product => (
                  <SwiperSlide key={product.id}>
                    <ProductCardHome
                      {...product}
                      isNew={true}
                      onClick={() => handleProductClick(product)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </>
      )}
    </>
  );
};
