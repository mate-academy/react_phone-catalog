import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { useProducts } from '../../context/ProductsContext';
import { FullCard } from '../../types/fullInfoCard';
import { ModelsListSlider } from '../ModelsListSlider';
import { Loader } from '../Loader';
import {
  getCorrectUrl,
  getCssColor,
  useWindowWidth,
} from '../../utils/helpers';
import styles from './Model.module.scss';

export const Model = () => {
  const { t, i18n } = useTranslation();
  const { productId } = useParams();
  const { products, favorites, cart, setFavorites, setCart } = useProducts();
  const navigate = useNavigate();
  const isValidUrl = products.some(item => item.itemId === productId);
  const [model, setModel] = useState<FullCard | null>(null);
  const [mainImage, setMainImage] = useState(0);
  const curWindowWidth = useWindowWidth();
  const modelShortData = products.find(product => product.itemId === productId);
  const [isLoading, setIsLoading] = useState(true);

  const similarProducts = products.filter(
    item => item.category === modelShortData?.category,
  );

  useEffect(() => {
    const stored = sessionStorage.getItem('modelVersions');
    const models: FullCard[] = stored ? JSON.parse(stored) : [];
    const cachedModel = models.find(m => String(m.id) === String(productId));

    if (cachedModel) {
      setModel(cachedModel);
      setIsLoading(false);

      return;
    } else {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      const fetchModel = async () => {
        if (!modelShortData || !productId) {
          return;
        }

        try {
          const response = await fetch(
            `api/${modelShortData.category}-lang.json`,
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          const curModel = data.find((item: FullCard) => item.id === productId);

          if (!curModel) {
            throw new Error('Product not found');
          } else {
            models.push(curModel);
            sessionStorage.setItem('modelVersions', JSON.stringify(models));
            setModel(curModel);
          }
        } catch (err) {
          throw new Error('Unsucceful fetch');
        }
      };

      fetchModel();

      return () => clearTimeout(timer);
    }
  }, [productId, modelShortData, navigate]);

  if (!isValidUrl) {
    navigate('/not_found_product');
  }

  const chooseMainImage = (index: number) => {
    if (curWindowWidth < 1200) {
      return index * 288;
    } else {
      return index * 464;
    }
  };

  const handleLike = () => {
    if (modelShortData) {
      const isAlreadyFavorite = favorites.some(
        item => item.id === modelShortData.id,
      );

      let updatedFavorites;

      if (isAlreadyFavorite) {
        updatedFavorites = favorites.filter(
          item => item.id !== modelShortData.id,
        );
      } else {
        updatedFavorites = [...favorites, modelShortData];
      }

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };

  const addToCart = () => {
    if (modelShortData) {
      const isInCart = cart.some(item => item.id === modelShortData.id);

      if (isInCart) {
        return;
      }

      const updatedCart = [...cart, { ...modelShortData, amount: 1 }];

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.model}>
          <div className={styles.model__back} onClick={() => navigate(-1)}>
            <div className={styles.model__back__arrow}></div>
            <div className={styles.model__back__text}>{t('back')}</div>
          </div>
          <h1 className={styles.model__name}>{model?.name}</h1>
          <div className={styles.model__container}>
            <div className={styles.model__images}>
              <div className={styles.model__images__main_image__wrap}>
                <div
                  className={styles.model__images__main_image__list}
                  style={{
                    transform: `translateX(-${chooseMainImage(mainImage)}px)`,
                  }}
                >
                  {model?.images.map(image => {
                    return (
                      <img
                        key={image}
                        className={styles.model__images__main_image}
                        src={image}
                        alt={image}
                      ></img>
                    );
                  })}
                </div>
              </div>
              <div className={styles.model__images__additional_images}>
                {model?.images.map((image, index) => {
                  return (
                    <img
                      onClick={() => setMainImage(index)}
                      src={image}
                      key={image}
                      className={cn(
                        styles.model__images__additional_images__image,
                        {
                          // eslint-disable-next-line max-len
                          [styles.model__images__additional_images__image__active]:
                            index === mainImage,
                        },
                      )}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.model__purchase_panel}>
              <div className={styles.model__purchase_panel__header}>
                <div
                  className={styles.model__purchase_panel__header__colors_title}
                >
                  {t('availableColors')}
                </div>
                <div className={styles.model__purchase_panel__header__model_id}>
                  ID: {modelShortData?.id}
                </div>
              </div>
              <div className={styles.model__purchase_panel__card}>
                <div className={styles.model__purchase_panel__card__colors}>
                  {model?.colorsAvailable.map(color => {
                    return (
                      <Link
                        to={`/${model.category}/${model.namespaceId}-${model.capacity.toLocaleLowerCase()}-${getCorrectUrl(color)}`}
                        key={color}
                        className={cn(
                          // eslint-disable-next-line max-len
                          styles.model__purchase_panel__card__colors__color_option,
                          {
                            // eslint-disable-next-line max-len
                            [styles.model__purchase_panel__card__colors__color_option__selected]:
                              color === model.color,
                          },
                        )}
                      >
                        <div
                          className={
                            // eslint-disable-next-line max-len
                            styles.model__purchase_panel__card__colors__color_option__fill
                          }
                          style={{
                            backgroundColor: getCssColor(color),
                          }}
                        ></div>
                      </Link>
                    );
                  })}
                </div>
                <div className={styles.model__purchase_panel__card__capacities}>
                  <div
                    className={
                      styles.model__purchase_panel__card__capacities__title
                    }
                  >
                    {t('selectCapacity')}
                  </div>
                  <div
                    className={
                      styles.model__purchase_panel__card__capacities__list
                    }
                  >
                    {model?.capacityAvailable.map(capacity => {
                      return (
                        <Link
                          to={`/${model.category}/${model.namespaceId}-${capacity.toLocaleLowerCase()}-${getCorrectUrl(model.color)}`}
                          key={capacity}
                          style={{
                            textDecoration: 'none',
                          }}
                        >
                          <div
                            className={cn(
                              // eslint-disable-next-line max-len
                              styles.model__purchase_panel__card__capacities__option,
                              {
                                // eslint-disable-next-line max-len
                                [styles.model__purchase_panel__card__capacities__option_selected]:
                                  capacity === model.capacity,
                              },
                            )}
                          >
                            {capacity}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.model__purchase_panel__card__prices}>
                  <div
                    className={
                      styles.model__purchase_panel__card__prices__regular
                    }
                  >
                    ${model?.priceDiscount}
                  </div>
                  <div
                    className={
                      styles.model__purchase_panel__card__prices__discount
                    }
                  >
                    ${model?.priceRegular}
                  </div>
                </div>
                <div className={styles.model__purchase_panel__card__buttons}>
                  <div
                    className={cn(
                      styles.model__purchase_panel__card__buttons__add,
                      {
                        // eslint-disable-next-line max-len
                        [styles.model__purchase_panel__card__buttons__add_added]:
                          cart.some(item => item.id === modelShortData?.id),
                      },
                    )}
                    onClick={addToCart}
                  >
                    {cart.some(item => item.itemId === modelShortData?.itemId)
                      ? t('addedToCart')
                      : t('addToCart')}
                  </div>
                  <button
                    className={cn(
                      styles.model__purchase_panel__card__buttons__like,
                      {
                        // eslint-disable-next-line max-len
                        [styles.model__purchase_panel__card__buttons__like__active]:
                          favorites.some(
                            item => item.id === modelShortData?.id,
                          ),
                      },
                    )}
                    onClick={handleLike}
                  ></button>
                </div>

                <div className={styles.model__purchase_panel__card__detail}>
                  <div
                    className={styles.model__purchase_panel__card__detail__row}
                  >
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__name
                      }
                    >
                      {t('screen')}
                    </div>
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__param
                      }
                    >
                      {model?.screen}
                    </div>
                  </div>
                  <div
                    className={styles.model__purchase_panel__card__detail__row}
                  >
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__name
                      }
                    >
                      {t('resolution')}
                    </div>
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__param
                      }
                    >
                      {model?.resolution}
                    </div>
                  </div>
                  <div
                    className={styles.model__purchase_panel__card__detail__row}
                  >
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__name
                      }
                    >
                      {t('processor')}
                    </div>
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__param
                      }
                    >
                      {model?.processor}
                    </div>
                  </div>
                  <div
                    className={styles.model__purchase_panel__card__detail__row}
                  >
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__name
                      }
                    >
                      {t('ram')}
                    </div>
                    <div
                      className={
                        styles.model__purchase_panel__card__detail__row__param
                      }
                    >
                      {model?.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.model__about}>
            <h3 className={styles.model__about__title}>{t('about')}</h3>
            {i18n.language === 'en' ? (
              <>
                {model?.description.en.map(item => {
                  return (
                    <div key={item.title} className={styles.model__about__part}>
                      <h4 className={styles.model__about__part__title}>
                        {item.title}
                      </h4>
                      <p className={styles.model__about__part__paragraph}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {model?.description.uk.map(item => {
                  return (
                    <div key={item.title} className={styles.model__about__part}>
                      <h4 className={styles.model__about__part__title}>
                        {item.title}
                      </h4>
                      <p className={styles.model__about__part__paragraph}>
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className={styles.model__tech_specs}>
            <h4 className={styles.model__tech_specs__title}>
              {t('techSpecs')}
            </h4>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('screen')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.screen}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('resolution')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.resolution}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('processor')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.processor}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('ram')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.ram}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('builtInMemory')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.capacity}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('camera')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.camera}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('zoom')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.zoom}
              </span>
            </div>
            <div className={styles.model__tech_specs__params}>
              <span className={styles.model__tech_specs__params__name}>
                {t('cell')}
              </span>
              <span className={styles.model__tech_specs__params__data}>
                {model?.cell.join(', ')}
              </span>
            </div>
          </div>

          <ModelsListSlider
            title={t('alsoLike')}
            products={similarProducts.slice(0, 30)}
            discount={false}
          />
        </div>
      )}
    </>
  );
};
