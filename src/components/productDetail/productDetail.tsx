/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
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

export const ProductDetail: React.FC = () => {
  const { itemId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = useSelector((state: RootState) => state.cart.items);

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
    status = 'idle';
  }

  const favoritesProducts = useSelector(
    (state: RootState) => state.favorite.items,
  );

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
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
      selectParts[3] = memory;
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

    console.log(color1);
    console.log(select);

    navigate(`/${selectedProduct?.category}/${newColor}`);
  };

  return (
    <>
      {status === 'loading' ? (
        <div className={styles.loader}>
          <CircleLoader size={150} color="#1c5a9b" />
        </div>
      ) : (
        <div className={classNames(styles.product, 'container')}>
          <h2>{selectedProduct?.name}</h2>

          <img
            src={mainImage}
            className={styles.product_img}
            alt={selectedProduct?.name}
          />
          <div className={styles.product_img_container}>
            {selectedProduct?.images.map(
              (
                image: string | undefined,
                index: React.Key | null | undefined,
              ) => (
                <img
                  key={index}
                  src={image}
                  onClick={() => handleImageClick(image)}
                  className={classNames({
                    [styles.product_imgs]: true,
                    [styles.black]: image === mainImage,
                  })}
                  alt={`Thumbnail`}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ),
            )}
          </div>

          <p>
            Available colors <span>ID: 843256</span>
          </p>
          <ul className={styles.product_colors}>
            {selectedProduct?.colorsAvailable.map((color, index) => {
              return (
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
                      backgroundColor: color === 'midnight' ? 'black' : color,
                    }}
                  ></span>
                </li>
              );
            })}
          </ul>
          <div className={styles.product_capacity_div}>
            <p className={styles.product_capacity_text}>Select capacity</p>
            <ul className={styles.product_capacity}>
              {selectedProduct?.capacityAvailable.map((capacity, index) => {
                return (
                  <li key={index} className={styles.product_capacity_item}>
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
                );
              })}
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
                Add to cart
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
                  {selectedProduct?.screen.split(' ').slice(0, 2).join(' ')}
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
                <span className={styles.buy_span}>{selectedProduct?.ram}</span>
              </p>
            </div>
          </section>
          <section className={styles.about}>
            <h3 className={styles.about_title}>About</h3>

            {selectedProduct?.description.map((describe, index) => {
              return (
                <React.Fragment key={index}>
                  <h3 className={styles.about_describe}>{describe.title}</h3>
                  <p className={styles.about_text}>{describe.text}</p>
                </React.Fragment>
              );
            })}
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
                <span className={styles.spec_span}>{selectedProduct?.ram}</span>
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
      )}
    </>
  );
};
