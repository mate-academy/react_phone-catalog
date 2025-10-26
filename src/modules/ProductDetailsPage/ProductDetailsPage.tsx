/* eslint-disable max-len */
import { Breadcrumb } from '../shared/components/Breadcrumb/Breadcrumb';
import { Slider } from '../shared/components/Slider/Slider';
import styles from './ProductDetailsPage.module.scss';
import card from '../shared/components/ProductCard/ProductCard.module.scss';
import productData from '../../../public/api/products.json';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BackButton } from '../shared/components/Buttons/BackButton/BackButton';
import { ProductDetails } from '../shared/types/ProductDetails';
import { ProductData } from '../shared/types/ProductData';
import { AddToCartButton } from '../shared/components/Buttons/AddToCartButton/AddToCartButton';
import { FavoritesButton } from '../shared/components/Buttons/FavoritesButton/FavoritesButton';

const TITLE = 'You may also like';

const appleColors = {
  naturaltitanium: '#e9e4d9ff',
  deserttitanium: '#e6ceb3ff',
  whitetitanium: '#efefefff',
  backtitanium: '#393939ff',
  midnightgreen: '#4e5850',
  spaceblack: '#3e3e40',
  sierrablue: '#a9c4e1ff',
  spacegray: '#4e4f58ff',
  graphite: '#595c67',
  midnight: '#313143ff',
  rosegold: '#fddcd7',
  yellow: '#f5ea61',
  green: '#bad366',
  purple: '#dac3ecff',
  silver: '#a2aaad',
  coral: '#f8998d',
  black: '#0d0d0d',
  white: '#faf7f6',
  pink: '#e6cdd1',
  blue: '#6ba1c4',
  gold: '#fcdbc1',
  red: '#e82c00',
};

export const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { pathname } = useLocation();

  const [loader, setLoader] = useState(false);
  const [product, setProduct] = useState<ProductDetails>();
  const [itemFromProduct, setItemFromProduct] = useState<ProductData>();
  const [errorMessage, setErrorMessage] = useState('');
  const [productPhoto, setProductPhoto] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const typeOfProduct = product?.category || pathname.split('/').find(part => part[1]);

  function getProductByType() {
    switch (typeOfProduct) {
      case 'phones':
        return phones;
      case 'tablets':
        return tablets;
      case 'accessories':
        return accessories;
      default:
        return [];
    }
  }

  function handleitemFromProduct(id: string) {
    return productData.find(i => i.itemId === id);
  }

  const rec = product
    ? productData.filter(p => p.category === typeOfProduct && p.price >= product.priceDiscount)
    : productData;

  useEffect(() => {
    setLoader(true);
    try {
      const catalog = getProductByType();

      if (!catalog.length || !productId) {
        setErrorMessage('Catalog is empty');

        return;
      }

      const found = catalog.find(p => p.id === productId);

      if (!found) {
        setErrorMessage('Item was not found');

        return;
      }

      const itemInCatalog = handleitemFromProduct(found.id);

      if (!itemInCatalog) {
        setErrorMessage('Item does not exist in productData');

        return;
      }

      setItemFromProduct(itemInCatalog);
      setSelectedColor(found.color);
      setSelectedCapacity(found.capacity);

      setProduct(found);
      setProductPhoto(found.images?.[0] ?? '');
    } finally {
      setErrorMessage('');
      setLoader(false);
    }
  }, [typeOfProduct, productId]);

  useEffect(() => {
    setLoader(true);
    try {
      const catalog = getProductByType();

      if (!catalog.length || !productId) {
        setErrorMessage('Catalog is empty');

        return;
      }

      const found = catalog.find(p => p.id === productId);

      if (!found) {
        setErrorMessage('Item was not found');

        return;
      }

      let next = found;

      if (selectedColor && selectedColor !== found.color) {
        const siblings = catalog.filter(p => p.namespaceId === found.namespaceId);
        const sameColor = siblings.find(p => p.color === selectedColor);

        if (sameColor) {
          next = sameColor;
        }

        if (next.id !== productId) {
          const nextPath = `/${next.category}/${next.id}`;

          navigate(nextPath, { replace: true });

          setSelectedColor('');

          return;
        }
      }

      if (selectedCapacity && selectedCapacity !== found.capacity) {
        const siblings = catalog.filter(p => p.namespaceId === found.namespaceId);
        const sameCapacity = siblings.find(
          p => p.capacity === selectedCapacity && p.color === (selectedColor || found.color),
        );

        if (sameCapacity) {
          next = sameCapacity;
        } else {
          const anyCapacity = siblings.find(p => p.capacity === selectedCapacity);

          if (anyCapacity) {
            next = anyCapacity;
          }
        }

        if (next.id !== productId) {
          const nextPath = `/${next.category}/${next.id}`;

          navigate(nextPath, { replace: true });

          setSelectedCapacity('');

          return;
        }
      }

      const itemInCatalog = handleitemFromProduct(next.id);

      if (!itemInCatalog) {
        setErrorMessage('Item does not exist in productData');

        return;
      }

      setItemFromProduct(itemInCatalog);

      setProduct(next);
      setProductPhoto(next.images[0]);
      setSelectedCapacity(next.capacity);
      setSelectedColor(next.color);
      setLoader(false);
    } finally {
      setErrorMessage('');
      setLoader(false);
    }
  }, [selectedColor, selectedCapacity]);

  return (
    <div className={styles.product}>
      <div className={styles.product__wrapper}>
        {loader ? (
          <section>Loading...</section>
        ) : (
          <div className={styles.product__container}>
            <section className={styles.product__navigation}>
              <Breadcrumb />
            </section>

            <section className={styles.product__header}>
              <BackButton fallback={`/${product?.category}`} />
              <h1 className={styles.product__header__title}>{product?.name}</h1>
              {errorMessage && <h1 className={styles.product__header__title}>{errorMessage}</h1>}
            </section>

            <section className={styles.product__details}>
              <div className={styles.product__gallery}>
                {product?.images.map(img => (
                  <img
                    key={img}
                    src={`./${img}`}
                    className={styles.product__preview}
                    onClick={() => {
                      setProductPhoto(`${img}`);
                    }}
                  ></img>
                ))}
              </div>
              <div className={styles.product__photo}>
                <img src={`./${productPhoto}`} className={styles.product__heroimg}></img>
              </div>

              <div className={styles.product__filters}>
                <div className={styles.product__colors}>
                  <h6 className={styles.product__filters__title}>Available colors</h6>
                  {product?.colorsAvailable.map((color: string) => {
                    const col = color;

                    return (
                      <div
                        key={col}
                        className={styles.colorOption}
                        style={{
                          ['--swatch' as string]:
                            appleColors[col as keyof typeof appleColors] ?? '#ccc',
                        }}
                      >
                        <input
                          type="radio"
                          id={col}
                          name="color"
                          value={col}
                          checked={selectedColor === col}
                          className={styles.colorInput}
                          onChange={e => {
                            setSelectedColor(e.target.value);
                          }}
                        />
                        <label htmlFor={col} className={styles.colorLabel}>
                          <span hidden={true} aria-hidden="true">
                            {col}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>

                <span className={styles.product__line}></span>

                <div className={styles.product__capacitys}>
                  <h6 className={styles.product__filters__title}>Select capacity</h6>
                  {product?.capacityAvailable.map((capacity: string) => (
                    <div key={capacity} className={styles.capacityOption}>
                      <input
                        type="radio"
                        id={capacity}
                        name="capacity"
                        value={capacity}
                        checked={selectedCapacity === capacity}
                        className={styles.product__capacityInput}
                        onChange={e => {
                          setSelectedCapacity(e.target.value);
                        }}
                      />
                      <label htmlFor={capacity} className={styles.capacityLabel}>
                        {capacity}
                      </label>
                    </div>
                  ))}
                </div>

                <span className={styles.product__line}></span>

                {product && itemFromProduct && !errorMessage && (
                  <div className={styles.product__info}>
                    <div className={styles.info__price}>
                      <div className={card.card__price}>
                        <div className={`${card.card__current} ${styles.info__discontPrice}`}>
                          ${product.priceDiscount}
                        </div>
                        <div className={`${card.card__full} ${styles.info__fullPrice}`}>
                          ${product.priceRegular}
                        </div>
                      </div>
                      <div className={card.card__buttons}>
                        <AddToCartButton product={itemFromProduct} />
                        <FavoritesButton product={itemFromProduct} />
                      </div>
                    </div>
                    <div className={styles.info__description}>
                      <div className={card.card__description}>
                        <div className={card.card__param}>Screen</div>
                        <div className={card.card__info}>{product.screen}</div>
                      </div>
                      <div className={card.card__description}>
                        <div className={card.card__param}>Resolution</div>
                        <div className={card.card__info}>{product.resolution}</div>
                      </div>
                      <div className={card.card__description}>
                        <div className={card.card__param}>Processor</div>
                        <div className={card.card__info}>{product.processor}</div>
                      </div>
                      <div className={card.card__description}>
                        <div className={card.card__param}>RAM</div>
                        <div className={card.card__info}>{product.ram}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className={styles.product__description}>
              <div className={styles.product__about}>
                <article className={styles.about}>
                  <h2 className={styles.subtitle}>About</h2>
                  <div className={styles.about__wrapper}>
                    <span className={styles.product__line}></span>
                    {product?.description.map(des => (
                      <div key={des.title} className={styles.about__description}>
                        <h3 className={styles.about__title}>{des.title}</h3>
                        <p className={styles.about__text}> {des.text}</p>
                      </div>
                    ))}
                  </div>
                </article>

                {product && (
                  <article className={styles.spec}>
                    <h2 className={styles.subtitle}>Tech specs</h2>
                    <div className={styles.spec__wrapper}>
                      <span className={styles.product__line}></span>
                      <div className={styles.spec__discription}>
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>Screen</div>
                          <div className={styles.spec__info}>{product.screen}</div>
                        </div>
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>Resolution</div>
                          <div className={styles.spec__info}>{product.resolution}</div>
                        </div>
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>Processor</div>
                          <div className={styles.spec__info}>{product.processor}</div>
                        </div>
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>RAM</div>
                          <div className={styles.spec__info}>{product.ram}</div>
                        </div>
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>Built in memory</div>
                          <div className={styles.spec__info}>{product.capacity}</div>
                        </div>
                        {product.camera && (
                          <>
                            <div className={styles.spec__container}>
                              <div className={styles.spec__param}>Camera</div>
                              <div className={styles.spec__info}>{product.camera}</div>
                            </div>
                            <div className={styles.spec__container}>
                              <div className={styles.spec__param}>Zoom</div>
                              <div className={styles.spec__info}>{product.zoom}</div>
                            </div>
                          </>
                        )}
                        <div className={styles.spec__container}>
                          <div className={styles.spec__param}>Cell</div>
                          <div className={styles.spec__info}>{product.cell.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            </section>

            <section className={styles.product__slider}>
              <Slider items={rec} title={TITLE} />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
