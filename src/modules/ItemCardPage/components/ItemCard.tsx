/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ItemCard.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCurrentGadget } from '../../../features/chosenItemsSlice';
import { ButtonBack } from '../../shared/ButtonBack/ButtonBack';
import { setIsWrongParams } from '../../../features/booleanSlice';
import { CardButtonsBlock } from '../../shared/CardButtonsBlock/CardButtonsBlock';
import { ProductsSlider } from '../../shared/ProductsSlider/ProductsSlider';
import { colorHexMap } from './../../colorHexMap';
import { Loader } from '../../Loader';
import { CurrentProductSlider } from '../../shared/CurrentProductSlider/CurrentProductSlider';
import { Product } from '../../../types/Product';
import { useTranslation } from 'react-i18next';
import { Phone } from '../../../types/Phone';
import { Tablet } from '../../../types/Tablet';
import { Accessory } from '../../../types/Accessory';
import { handleClickOnGadget } from '../../shared/clickOnGadget';

export const ItemCard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname;
  const paramsObj = useParams<{ productId: string }>();
  const params = paramsObj.productId;
  let gadgetWithCamera = null;
  let gadgetWithZoom = null;
  const navigate = useNavigate();

  const listOfProducts = useAppSelector(state => state.products.objects);
  const listOfPhones = useAppSelector(state => state.phones.objects);
  const listOfTablets = useAppSelector(state => state.tablets.objects);
  const listOfAccessories = useAppSelector(state => state.accessories.objects);
  const currrentGadget = useAppSelector(
    state => state.chosenItems.currentGadget,
  );
  const currentProduct = useAppSelector(
    state => state.chosenItems.currentProduct,
  );
  const loadingStatusPhones = useAppSelector(state => state.phones.loading);
  const loadingStatusTablets = useAppSelector(state => state.tablets.loading);
  const loadingStatusAccessories = useAppSelector(
    state => state.accessories.loading,
  );
  const isWrongParams = useAppSelector(state => state.boolean.isWrongParams);
  const category = useAppSelector(
    state => state.chosenItems.currentGadget?.category,
  );

  const [selectedColor, setSelectedColor] = useState<string | undefined>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(
    '',
  );
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setSelectedColor(currrentGadget?.color);
    setSelectedCapacity(currrentGadget?.capacity);

    if (path.includes('phones')) {
      if (listOfPhones.some(phone => phone.id === params)) {
        const neededPhone = listOfPhones.find(phone => phone.id === params);

        if (neededPhone !== undefined) {
          dispatch(setCurrentGadget(neededPhone));
          dispatch(setIsWrongParams(false));
        }
      } else {
        dispatch(setIsWrongParams(true));
      }
    } else if (path.includes('tablets')) {
      if (listOfTablets.some(tablet => tablet.id === params)) {
        const neededTablet = listOfTablets.find(tablet => tablet.id === params);

        if (neededTablet !== undefined) {
          dispatch(setCurrentGadget(neededTablet));
          dispatch(setIsWrongParams(false));
        }
      } else {
        dispatch(setIsWrongParams(true));
      }
    } else if (path.includes('accessories')) {
      if (listOfAccessories.some(accessory => accessory.id === params)) {
        const neededAccessory = listOfAccessories.find(
          accessory => accessory.id === params,
        );

        if (neededAccessory !== undefined) {
          dispatch(setCurrentGadget(neededAccessory));
          dispatch(setIsWrongParams(false));
        }
      } else {
        dispatch(setIsWrongParams(true));
      }
    }
  }, [
    paramsObj,
    listOfPhones,
    listOfAccessories,
    listOfTablets,
    path,
    currrentGadget,
    params,
    dispatch,
  ]);

  const getLoader = () => {
    switch (category) {
      case 'phones':
        return loadingStatusPhones && <Loader />;
      case 'tablets':
        return loadingStatusTablets && <Loader />;
      case 'accessories':
        return loadingStatusAccessories && <Loader />;
      default:
        return;
    }
  };

  useEffect(() => {
    const suggestedArray: Product[] = [];

    setSuggestedProducts([]);

    while (suggestedArray.length < 12) {
      const randomIndex = Math.floor(Math.random() * listOfProducts.length);
      const randomGadget = listOfProducts[randomIndex];

      if (!suggestedArray.includes(randomGadget)) {
        suggestedArray.push(randomGadget);
      }
    }

    setSuggestedProducts(suggestedArray);
  }, [currrentGadget, listOfProducts]);

  if (currrentGadget) {
    const hasCamera = currrentGadget.hasOwnProperty('camera');

    if (hasCamera) {
      const gadgetString = JSON.stringify(currrentGadget);

      gadgetWithCamera = JSON.parse(gadgetString);
    }

    const hasZoom = currrentGadget.hasOwnProperty('zoom');

    if (hasZoom) {
      const gadgetString = JSON.stringify(currrentGadget);

      gadgetWithZoom = JSON.parse(gadgetString);
    }
  }

  const getNewGadget = (color: string, capacity: string, spacedId: string) => {
    switch (category) {
      case 'phones':
        return listOfPhones.filter(
          phone =>
            phone.color === color &&
            phone.capacity === capacity &&
            spacedId === phone.namespaceId,
        );
      case 'tablets':
        return listOfTablets.filter(
          tablet =>
            tablet.color === color &&
            tablet.capacity === capacity &&
            spacedId === tablet.namespaceId,
        );
      case 'accessories':
        return listOfAccessories.filter(
          accessory =>
            accessory.color === color &&
            accessory.capacity === capacity &&
            spacedId === accessory.namespaceId,
        );
      default:
        return;
    }
  };

  const handleColorChanging = (color: string) => {
    setSelectedColor(color);

    let newGadgetArray: Phone[] | Tablet[] | Accessory[] | undefined = [];
    let newProduct: Product | undefined;

    if (currrentGadget) {
      newGadgetArray = getNewGadget(
        color,
        currrentGadget.capacity,
        currrentGadget.namespaceId,
      );
    }

    if (newGadgetArray !== undefined) {
      newProduct = listOfProducts.find(prod => {
        if (newGadgetArray !== undefined) {
          return prod.itemId === newGadgetArray[0].id;
        }

        return;
      });
    }

    if (newProduct !== undefined && newGadgetArray !== undefined) {
      handleClickOnGadget(newProduct, dispatch);
    }

    navigate(`/${newProduct?.category}/${newProduct?.itemId}`);
  };

  const handleCapacityChanging = (capacity: string) => {
    setSelectedCapacity(capacity);

    let newGadgetArray: Phone[] | Tablet[] | Accessory[] | undefined = [];
    let newProduct: Product | undefined;

    if (currrentGadget) {
      newGadgetArray = getNewGadget(
        currrentGadget.color,
        capacity,
        currrentGadget.namespaceId,
      );
    }

    if (newGadgetArray !== undefined) {
      newProduct = listOfProducts.find(prod => {
        if (newGadgetArray !== undefined) {
          return prod.itemId === newGadgetArray[0].id;
        }

        return;
      });
    }

    if (newProduct !== undefined && newGadgetArray !== undefined) {
      handleClickOnGadget(newProduct, dispatch);
    }

    navigate(`/${newProduct?.category}/${newProduct?.itemId}`);
  };

  return (
    <>
      {getLoader()}
      {!isWrongParams ? (
        <div className={styles.itemCard}>
          <div
            id="gadgetPathBlock"
            className={`${styles.itemCard__path} ${styles.path}`}
          >
            <Link className={styles.path__home} to="/">
              <img src="./icons/home-ico.svg" alt="home" />
            </Link>

            <img
              className={styles.path__arrow}
              src="./icons/arrow-right-light-ico.svg"
              alt="arrow-right"
            />

            <Link
              to={`/${currrentGadget?.category}`}
              className={styles.path__category}
            >
              {t(`${currrentGadget?.category}`)}
            </Link>

            <img
              className={styles.path__arrow}
              src="./icons/arrow-right-light-ico.svg"
              alt="arrow-right"
            />

            <p id="pathId" className={`${styles.path__id} ${styles.idVisible}`}>
              {currrentGadget?.id}
            </p>
          </div>

          <ButtonBack />

          <section className={`${styles.itemCard__main} ${styles.main}`}>
            <h2 className={styles.main__title}>{currrentGadget?.name}</h2>

            <CurrentProductSlider gadget={currrentGadget} />

            <div
              className={`${styles.main__interaction} ${styles.interaction}`}
            >
              <p className={styles.interaction__littleTitles}>
                {t('available_colors')}
              </p>

              <div className={styles.interaction__colors}>
                {currrentGadget?.colorsAvailable.map(color => {
                  const hexColor = colorHexMap[color] || '#fff';

                  return (
                    <div
                      onClick={() => handleColorChanging(color)}
                      key={color}
                      className={`${styles.interaction__colorBorder} ${selectedColor === color && styles.selectedColorStyle}`}
                    >
                      <div
                        title={color}
                        style={{ backgroundColor: hexColor }}
                        className={styles.interaction__color}
                      ></div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.interaction__firstHorizontal}></div>

              <p className={styles.interaction__littleTitles}>
                {t('select_capacity')}
              </p>

              <div className={styles.interaction__capacityBlock}>
                {currrentGadget?.capacityAvailable.map(capacity => (
                  <button
                    onClick={() => handleCapacityChanging(capacity)}
                    key={capacity}
                    className={`${styles.interaction__capacity} ${selectedCapacity === capacity && styles.selectedCapacityStyle}`}
                  >
                    {capacity}
                  </button>
                ))}
              </div>

              <div className={styles.interaction__secondHorizontal}></div>

              <div className={styles.interaction__priceBlock}>
                <p
                  className={styles.interaction__newPrice}
                >{`$${currrentGadget?.priceDiscount}`}</p>
                <p
                  className={styles.interaction__oldPrice}
                >{`$${currrentGadget?.priceRegular}`}</p>
              </div>

              <div className={styles.interaction__buttonsContainer}>
                <CardButtonsBlock gadg={currentProduct} />
              </div>

              <div className={styles.interaction__techBlock}>
                <div className={styles.interaction__tech}>
                  <p className={styles.interaction__techParameter}>
                    {t('screen')}
                  </p>

                  <p className={styles.interaction__techValue}>
                    {currrentGadget?.screen}
                  </p>
                </div>

                <div className={styles.interaction__tech}>
                  <p className={styles.interaction__techParameter}>
                    {t('resolution')}
                  </p>

                  <p className={styles.interaction__techValue}>
                    {currrentGadget?.resolution}
                  </p>
                </div>

                <div className={styles.interaction__tech}>
                  <p className={styles.interaction__techParameter}>
                    {t('processor')}
                  </p>

                  <p className={styles.interaction__techValue}>
                    {currrentGadget?.processor}
                  </p>
                </div>

                <div className={styles.interaction__tech}>
                  <p className={styles.interaction__techParameter}>
                    {t('ram')}
                  </p>

                  <p className={styles.interaction__techValue}>
                    {currrentGadget?.ram}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.itemCard__description}>
            <div className={styles.about}>
              <h3
                className={`${styles.about__title} ${styles.descriptionTitle}`}
              >
                {t('about')}
              </h3>

              <div
                className={`${styles.about__horizontal} ${styles.horizontal}`}
              ></div>

              <div className={styles.about__blocks}>
                <p
                  className={`${styles.about__text} ${styles.drscriptionText}`}
                >
                  {currrentGadget?.description[0].text}
                </p>

                <p
                  className={`${styles.about__text} ${styles.drscriptionText}`}
                >
                  {currrentGadget?.description[1].text}
                </p>

                <p
                  className={`${styles.about__text} ${styles.drscriptionText}`}
                >
                  {currrentGadget?.description[2].text}
                </p>
              </div>
            </div>

            <div className={styles.techSpecs}>
              <h3
                className={`${styles.techSpecs__title} ${styles.descriptionTitle}`}
              >
                {t('tech_specs')}
              </h3>

              <div
                className={`${styles.techSpecs__horizontal} ${styles.horizontal}`}
              ></div>

              <div className={styles.techSpecs__params}>
                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}> {t('screen')} </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.screen}
                  </p>
                </div>

                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}> {t('resolution')} </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.resolution}
                  </p>
                </div>

                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}> {t('processor')} </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.processor}
                  </p>
                </div>

                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}> {t('ram')} </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.ram}
                  </p>
                </div>

                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}>
                    {' '}
                    {t('built_in_memory')}{' '}
                  </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.capacity}
                  </p>
                </div>
                {gadgetWithCamera !== null && (
                  <div className={styles.techSpecs__param}>
                    <p className={styles.drscriptionText}> {t('camera')} </p>

                    <p className={styles.techSpecs__paramValue}>
                      {gadgetWithCamera.camera}
                    </p>
                  </div>
                )}

                {gadgetWithZoom !== null && (
                  <div className={styles.techSpecs__param}>
                    <p className={styles.drscriptionText}> {t('zoom')} </p>

                    <p className={styles.techSpecs__paramValue}>
                      {gadgetWithZoom.zoom}
                    </p>
                  </div>
                )}

                <div className={styles.techSpecs__param}>
                  <p className={styles.drscriptionText}> {t('cell')} </p>

                  <p className={styles.techSpecs__paramValue}>
                    {currrentGadget?.cell.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.itemCard__slider}>
            {suggestedProducts.length > 0 && (
              <ProductsSlider
                title={t('may_also_like')}
                gadgets={suggestedProducts}
              />
            )}
          </section>
        </div>
      ) : (
        <h3 className={styles.notFound}>{t('product_not_found')}</h3>
      )}
    </>
  );
};
