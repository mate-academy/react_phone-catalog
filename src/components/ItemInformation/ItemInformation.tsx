import { Link, useParams } from 'react-router-dom';
import styles from './ItemInformation.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllProductsAsync } from '../../features/getAllProductsSlice';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { addFavorite, removeFavorite } from '../../features/addFavoritesSlice';
import { addBucket, removeBucket } from '../../features/addProductSlice';
import { ItemsList } from '../ItemsList/ItemsList';

export const ItemInformation = () => {
  const { productId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // список, лоадер та можлива помилка для конкретного селектора
  const items = useAppSelector(state => state.allProducts.items);
  const loaded = useAppSelector(state => state.allProducts.loaded);
  const error = useAppSelector(state => state.allProducts.error);
  const currentProduct = items.find(item => item.id === productId); // продукт, з яким потрібно працювати в цьому компоненті
  const [currentImage, setCurrentImage] = useState(currentProduct?.images[0]);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.addedFavorites.items);
  const bucketProducts = useAppSelector(state => state.addBucket.items);
  const isClickedOnFavourite = favourites.some(
    fav => fav.itemId === currentProduct?.id,
  );
  const isClickedOnBucket = bucketProducts.some(
    bucket => bucket.itemId === currentProduct?.id,
  );

  // функція для добавлення favourite
  const generalProducts = useAppSelector(state => state.products.items);

  const handleAddDeleteFavourites = () => {
    const productToToggle = generalProducts.find(
      product => product.itemId === currentProduct?.id,
    );

    if (!productToToggle) {
      return;
    }

    if (isClickedOnFavourite) {
      dispatch(removeFavorite(productToToggle));
    } else {
      dispatch(addFavorite(productToToggle));
    }
  };

  const handleAddDeleteBucket = () => {
    const productToToggle = generalProducts.find(
      product => product.itemId === currentProduct?.id,
    );

    if (!productToToggle) {
      return;
    }

    if (isClickedOnBucket) {
      dispatch(removeBucket(productToToggle.id));
    } else {
      dispatch(addBucket({ ...productToToggle, quantity: 1 }));
    }
  };

  // оновлення картинки при запуску сторінки
  useEffect(() => {
    setCurrentImage(currentProduct?.images[0]);
  }, [currentProduct]);

  // виклик redux
  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, [dispatch]);

  const isClickedOnImage = (image: string) => {
    setCurrentImage(image);
  };

  // обробка лоадера
  if (!loaded) {
    return <Loader />;
  }

  // обробка помилки
  if (error) {
    return (
      <div className={styles.errorMessage}>
        Failed to load products. Please try again.
      </div>
    );
  }

  function ucFirst(str: string | undefined) {
    if (!str) {
      return str;
    }

    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className={styles.itemInformation}>
      <div className={styles.itemInformation_route}>
        <Link to={'/'}>
          <img src={`./img/icons/Home.svg`} alt="home" />
        </Link>
        <img src={`./img/icons/Chevron-right-dis.svg`} alt="home" />
        <h3>{ucFirst(currentProduct?.category)}</h3>
        <img src={`./img/icons/Chevron-right-dis.svg`} alt="home" />
        <p>{currentProduct?.name}</p>
      </div>

      <Link
        to={`../img/${currentProduct?.category}`}
        className={styles.itemInformation_buttonBack}
      >
        <img src={`./img/icons/Chevron-left.svg`} alt="back" />
        <p>Back</p>
      </Link>
      <h2 className={styles.itemInformation_title}>{currentProduct?.name}</h2>

      <div className={styles.itemInformation_generalInfo}>
        {/* on tablet */}
        <div
          className={styles.itemInformation_generalInfo_additionalImgOnTablet}
        >
          {currentProduct?.images.map(image => (
            <div
              key={image}
              style={{
                border: currentImage === image ? '1px solid' : '',
              }}
            >
              <img
                onClick={() => {
                  isClickedOnImage(image);
                }}
                src={`./${image}`}
                alt="img"
              />
            </div>
          ))}
        </div>
        {/**  */}

        <div className={styles.itemInformation_generalInfo_mainImage}>
          <img src={`./${currentImage}`} alt="image" />
        </div>

        {/* on phone */}
        <div
          className={styles.itemInformation_generalInfo_additionalImgOnPhone}
        >
          {currentProduct?.images.map(image => (
            <div
              key={image}
              style={{
                border: currentImage === image ? '1px solid #313237' : '',
              }}
            >
              <img
                onClick={() => {
                  isClickedOnImage(image);
                }}
                src={`./${currentImage}`}
                alt="img"
                style={{
                  border: currentImage === image ? '1px solid #313237' : '',
                }}
              />
            </div>
          ))}
        </div>
        {/**  */}

        <div className={styles.itemInformation_generalInfo_edit}>
          <div className={styles.itemInformation_generalInfo_edit__wrapper}>
            <div className={styles.itemInformation_generalInfo_edit__colours}>
              <p>Available colors</p>
              <div
                className={
                  styles.itemInformation_generalInfo_edit__colours_circles
                }
              >
                {currentProduct?.colorsAvailable.map(color => (
                  <Link
                    key={color}
                    to={`../${currentProduct.namespaceId}-${currentProduct.capacity.toLowerCase()}-${color}`}
                  >
                    <div
                      style={{
                        borderColor:
                          currentProduct.color === color ? 'black' : '#E2E6E9',
                      }}
                    >
                      <div style={{ backgroundColor: color }}></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div
              className={styles.itemInformation_generalInfo_edit__string}
            ></div>

            <div className={styles.itemInformation_generalInfo_edit__storage}>
              <p>Select capacity</p>
              <div className={styles.capacityOptions}>
                {currentProduct?.capacityAvailable.map(capacity => (
                  <Link
                    key={capacity}
                    to={`../${currentProduct.namespaceId}-${capacity.toLowerCase()}-${currentProduct.color}`}
                    className={styles.capacityLink}
                  >
                    <div
                      className={`${styles.capacityBox} ${
                        currentProduct.capacity === capacity
                          ? styles.active
                          : ''
                      }`}
                    >
                      <p
                        className={`${styles.capacityText} ${
                          currentProduct.capacity === capacity
                            ? styles.activeText
                            : ''
                        }`}
                      >
                        {capacity}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={styles.itemInformation_generalInfo_edit__string1}
            ></div>

            <div className={styles.itemInformation_generalInfo_edit__prices}>
              <h3>${currentProduct?.priceDiscount}</h3>
              <p>${currentProduct?.priceRegular}</p>
            </div>

            <div className={styles.itemInformation_generalInfo_buttons}>
              <div
                onClick={handleAddDeleteBucket}
                className={styles.itemInformation_generalInfo_buttons_add}
                style={{
                  backgroundColor: isClickedOnBucket ? 'white' : '#313237',
                }}
              >
                {isClickedOnBucket ? (
                  <p style={{ color: '#27AE60' }}>Selected</p>
                ) : (
                  <p>Add to cart</p>
                )}
              </div>
              <div
                onClick={() => {
                  handleAddDeleteFavourites();
                }}
                className={styles.itemInformation_generalInfo_buttons_favourite}
              >
                {isClickedOnFavourite ? (
                  <img
                    src={`./img/icons/FavouritesFilledHeart.svg`}
                    alt="img"
                  />
                ) : (
                  <img src={`./img/icons/favourites.svg`} alt="" />
                )}
              </div>
            </div>
            <div className={styles.itemInformation_generalInfo_info}>
              <div className={styles.itemInformation_generalInfo_info_string}>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__title
                  }
                >
                  Screen
                </p>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__text
                  }
                >
                  {currentProduct?.screen}
                </p>
              </div>
              <div className={styles.itemInformation_generalInfo_info_string}>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__title
                  }
                >
                  Resolution
                </p>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__text
                  }
                >
                  {currentProduct?.resolution}
                </p>
              </div>
              <div className={styles.itemInformation_generalInfo_info_string}>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__title
                  }
                >
                  Processor
                </p>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__text
                  }
                >
                  {currentProduct?.processor}
                </p>
              </div>
              <div className={styles.itemInformation_generalInfo_info_string}>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__title
                  }
                >
                  RAM
                </p>
                <p
                  className={
                    styles.itemInformation_generalInfo_info_string__text
                  }
                >
                  {currentProduct?.ram}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.itemInformation_info}>
        <div className={styles.itemInformation_info_about}>
          <h3 className={styles.itemInformation_info_title}>About</h3>
          <div className={styles.itemInformation_info_string}></div>
          <div className={styles.itemInformation_info_about_description}>
            {currentProduct?.description.map((desc, index) => (
              <React.Fragment key={index}>
                <div>
                  <h4
                    className={
                      styles.itemInformation_info_about_description_title
                    }
                  >
                    {desc.title}
                  </h4>
                  <p
                    className={
                      styles.itemInformation_info_about_description_text
                    }
                  >
                    {desc.text}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className={styles.itemInformation_info_techSpecs}>
          <h3 className={styles.itemInformation_info_title}>Tech specs</h3>
          <div className={styles.itemInformation_info_string}></div>

          <div className={styles.itemInformation_info_techSpecs_description}>
            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                Screen
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.screen}
              </p>
            </div>

            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                Resolution
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.resolution}
              </p>
            </div>

            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                Processor
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.processor}
              </p>
            </div>

            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                RAM
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.ram}
              </p>
            </div>

            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                Built in memory
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.capacity}
              </p>
            </div>

            {currentProduct?.category !== 'accessories' ? (
              <React.Fragment>
                <div
                  className={
                    styles.itemInformation_info_techSpecs_description_opt
                  }
                >
                  <p
                    className={
                      // eslint-disable-next-line max-len
                      styles.itemInformation_info_techSpecs_description_opt__title
                    }
                  >
                    Camera
                  </p>
                  <p
                    className={
                      // eslint-disable-next-line max-len
                      styles.itemInformation_info_techSpecs_description_opt__text
                    }
                  >
                    {currentProduct?.camera}
                  </p>
                </div>

                <div
                  className={
                    styles.itemInformation_info_techSpecs_description_opt
                  }
                >
                  <p
                    className={
                      // eslint-disable-next-line max-len
                      styles.itemInformation_info_techSpecs_description_opt__title
                    }
                  >
                    Zoom
                  </p>
                  <p
                    className={
                      // eslint-disable-next-line max-len
                      styles.itemInformation_info_techSpecs_description_opt__text
                    }
                  >
                    {currentProduct?.zoom}
                  </p>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}

            <div
              className={styles.itemInformation_info_techSpecs_description_opt}
            >
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__title
                }
              >
                Cell
              </p>
              <p
                className={
                  styles.itemInformation_info_techSpecs_description_opt__text
                }
              >
                {currentProduct?.cell}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemInformation__tiles}>
        <ItemsList />
      </div>
    </div>
  );
};
