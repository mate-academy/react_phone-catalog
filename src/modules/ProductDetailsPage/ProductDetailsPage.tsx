import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { PathLine } from '../../components/PathLine/indes';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAccessoriesData,
  getPhonesData,
  getProductData,
  getTabletsData,
} from '../../api/fetchClient';
import { AllCategoryType } from '../../types/AllCategoryType';
import { Loader } from '../../components/Loader';
import classNames from 'classnames';
import { Icon } from '../../components/Icon';
import { useCartAndFavContext } from '../shared/context/CartAndFavContext';
import { ProductSlider } from '../../components/ProductSlider';
import { Product } from '../../types/ProductType';
import { NotFoundProduct } from '../NotFoundProduct/NotFoundProduct';

const colorMap: Record<string, string> = {
  rosegold: '#B76E79',
  midnight: '#0A0B1D',
  midnightgreen: '#4E5851',
  sierrablue: '#9BB5CE',
  spacegray: '#4A4A4A',
  spaceblack: '#121212',
  champagne: '#F7E7CE',
  skyblueish: '#87CEEB',
};

export const ProductDetailsPage = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const pathElement = category;
  const productId = itemId;
  const [product, setProduct] = useState<AllCategoryType | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [mainPhoto, setMainPhoto] = useState<string | undefined>(undefined);
  const [dataToSlider, setDataToSlider] = useState<Product[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  const context = useCartAndFavContext();
  const { isFavorite, toggleFavorite, isCart, toggleCart } = context;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoader(true);
        let data;
        const prodData = await getProductData();

        if (pathElement === 'phones') {
          data = await getPhonesData();
        } else if (pathElement === 'tablets') {
          data = await getTabletsData();
        } else {
          data = await getAccessoriesData();
        }

        if (data) {
          const currentProduct = data.find(p => p.id === productId);

          setProduct(currentProduct || null);
        }

        if (prodData) {
          const currentProducts = prodData
            .filter(prod => prod.category === category)
            .sort(() => Math.random() - 0.314) // :D
            .slice(0, 12);

          setDataToSlider(currentProducts);
        }
      } catch {
        setError(true);
      } finally {
        {
          setLoader(false);
        }
      }
    }

    fetchData();
  }, [category, pathElement, productId]);

  useEffect(() => {
    setMainPhoto(product?.images[0]);
  }, [product]);

  const smallImageTypeSetter = (imgNum: number) => {
    if (imgNum === 0 || imgNum === 2 || imgNum === 4) {
      return styles.center;
    } else if (imgNum === 1) {
      return styles.bottom;
    } else {
      return styles.side;
    }
  };

  const handleColorChange = (color: string) => {
    if (product?.color !== color) {
      const modelId = product?.namespaceId;
      const capacity = product?.capacity.toLowerCase();
      const newId =
        `${modelId}-${capacity}-${color.trim().replaceAll(' ', '-')}`.toLowerCase();

      navigate(`/${category}/${newId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (product?.capacity !== capacity) {
      const modelId = product?.namespaceId;
      const color = product?.color.toLowerCase().trim().replaceAll(' ', '-');
      const newId = `${modelId}-${capacity}-${color}`.toLowerCase();

      navigate(`/${category}/${newId}`);
    }
  };

  if (error || !product) {
    return <NotFoundProduct />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.page__container}>
        <PathLine />
        <div className={styles.page__device}>
          <h2>{product?.name}</h2>
          <div className={styles.device__overview}>
            <div className={styles.device__images__container}>
              <div className={styles.device__images}>
                {loader ? (
                  <Loader />
                ) : (
                  product?.images.map((image, index) => (
                    <div
                      className={classNames(styles.small, {
                        [styles['small--active']]: mainPhoto === image,
                      })}
                      key={index}
                      onClick={() => setMainPhoto(image)}
                    >
                      <img
                        src={image}
                        alt="preview"
                        className={`${styles.img_contain} ${smallImageTypeSetter(index)}`}
                      />
                    </div>
                  ))
                )}
              </div>

              <div className={styles.main_image}>
                <img
                  src={mainPhoto}
                  alt={product?.name}
                  className={styles.img_contain}
                />
              </div>
            </div>
            <div className={styles.device__settings}>
              <div className={styles.settings__first}>
                <div className={styles.settings__colors}>
                  <div className={styles.settings__colors_text}>
                    Available colors
                  </div>
                  <div className={styles.settings__colors_colors}>
                    {product?.colorsAvailable.map((color, index) => (
                      <div
                        key={index}
                        className={classNames(styles.color_border, {
                          [styles['color_border--active']]:
                            product.color === color,
                        })}
                        onClick={() => handleColorChange(color)}
                      >
                        <div
                          className={styles.color_circle}
                          style={{
                            backgroundColor: colorMap[color] || color,
                          }}
                          title={color}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.settings__id}>{product?.id}</div>
              </div>
              <div className={styles.settings__separator} />
              <div className={styles.settings__second}>
                <div className={styles.settings__capacity_text}></div>
                <div className={styles.settings__capacity_capacity}>
                  {product?.capacityAvailable.map((capacity, index) => (
                    <div
                      key={index}
                      className={classNames(styles.capacity_border, {
                        [styles['capacity_border--active']]:
                          product.capacity === capacity,
                      })}
                      onClick={() => handleCapacityChange(capacity)}
                    >
                      <div
                        className={classNames(styles.capacity_text, {
                          [styles['capacity_text--active']]:
                            product.capacity === capacity,
                        })}
                      >
                        {capacity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.settings__separator} />
              <div className={styles['buttons-and-price']}>
                <div className={styles.price}>
                  <div className={styles.price__discount}>
                    ${product?.priceDiscount}
                  </div>
                  <div className={styles.price__regular}>
                    ${product?.priceRegular}
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.buttons__cart} ${product && isCart(product?.id) && [styles['buttons__cart--active']]}`}
                    onClick={() => product && toggleCart(product?.id)}
                  >
                    {product && isCart(product?.id) ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    className={styles.buttons__fovourite}
                    onClick={() => product && toggleFavorite(product?.id)}
                  >
                    <Icon
                      name={
                        product && isFavorite(product?.id)
                          ? 'favouritesfilled'
                          : 'favourites'
                      }
                      className={styles.fovourite_icon}
                    />
                  </button>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.info__box}>
                  <div className={styles.info__text}>Screen</div>
                  <div className={styles.info__textprod}>{product?.screen}</div>
                </div>
                <div className={styles.info__box}>
                  <div className={styles.info__text}>Resolution</div>
                  <div className={styles.info__textprod}>
                    {product?.resolution}
                  </div>
                </div>
                <div className={styles.info__box}>
                  <div className={styles.info__text}>Processor</div>
                  <div className={styles.info__textprod}>
                    {product?.processor}
                  </div>
                </div>
                <div className={styles.info__box}>
                  <div className={styles.info__text}>RAM</div>
                  <div className={styles.info__textprod}>{product?.ram}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.block__about}>
          <h3 className={styles.block__about__title}>About</h3>
          <div className={styles.block__separator} />
          {product?.description.map((desc, index) => (
            <div className={styles.about__info} key={index}>
              <h4 className={styles.about__info_title}>{desc.title}</h4>
              <div className={styles.about__info_text}>{desc.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.block__specs}>
          <h3 className={styles.block__specs__title}>Tech specs</h3>
          <div className={styles.block__separator} />
          <div className={styles.specs}>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Screen</div>
              <div className={styles.specs__box_textprod}>
                {product?.screen}
              </div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Resolution</div>
              <div className={styles.specs__box_textprod}>
                {product?.resolution}
              </div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Processor</div>
              <div className={styles.specs__box_textprod}>
                {product?.processor}
              </div>
            </div>{' '}
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>RAM</div>
              <div className={styles.specs__box_textprod}>{product?.ram}</div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Build in memory</div>
              <div className={styles.specs__box_textprod}>
                {product?.capacity}
              </div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Camera</div>
              <div className={styles.specs__box_textprod}>
                {product?.camera}
              </div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Zoom</div>
              <div className={styles.specs__box_textprod}>{product?.zoom}</div>
            </div>
            <div className={styles.specs__box}>
              <div className={styles.specs__box_text}>Cell</div>
              <div className={styles.specs__box_textprod}>{product?.cell}</div>
            </div>
          </div>
        </div>
      </div>
      {dataToSlider && (
        <div className={styles.slider}>
          <ProductSlider
            title={'You may also like'}
            products={dataToSlider}
            id={1}
          />
        </div>
      )}
    </div>
  );
};
