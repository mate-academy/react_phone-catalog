/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import style from './ProductDetailsPage.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { getAllProducts, getCategoryProduct } from '../../api/getProducts';
import { CategoryContext } from '../../context/CategoryContext';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../modules/shared/Breadcrumbs';
import { ProductsContext } from '../../context/ProductsContext';
import { Buttons } from '../../components/Buttons';
import { ProductsSlider } from '../../modules/HomePage/components/ProductsSlider';
import { BlockTitle } from '../../types/BlockTitle';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { Loader } from '../../components/Loader';
import { colorMap } from '../../utils/colorMap';

export const ProductDetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState<ProductDetails[]>(
    [],
  );
  const [currentProductColor, setCurrentProductColor] = useState<string>('');
  const { currentCategory } = useContext(CategoryContext);
  const { allProducts, setAllProducts } = useContext(ProductsContext);

  const { productId } = useParams();

  const productPreview = allProducts.find(
    product => product.itemId === productId,
  );
  const itemId = productPreview ? productPreview.id.toString() : '';

  useEffect(() => {
    setIsLoading(true);

    const promises = [
      getAllProducts().then(setAllProducts),
      currentCategory
        ? getCategoryProduct(currentCategory).then(setCategoryProducts)
        : Promise.resolve(),
    ];

    Promise.all(promises).finally(() => setIsLoading(false));
  }, [currentCategory, setAllProducts]);

  const selectedProduct = categoryProducts.find(
    product => product.id === productId,
  );

  useEffect(() => {
    if (selectedProduct) {
      let copyColor = selectedProduct.color;

      switch (selectedProduct.color) {
        case 'space gray':
          copyColor = 'gray';
          break;
        case 'midnight':
          copyColor = 'midnightblue';
          break;
      }

      setCurrentProductColor(copyColor);
    }
  }, [selectedProduct]);

  // #region Product images

  const [productMainImage, setProductMainImage] = useState<string | null>(null);

  useEffect(() => {
    const productImages = selectedProduct ? selectedProduct.images : [];

    if (productImages.length) {
      setProductMainImage(productImages[0]);
    }
  }, [selectedProduct]);

  // #endregion

  const suggestionProducts = getSuggestedProducts(allProducts);

  if (isLoading) {
    return <Loader />;
  }

  if (!selectedProduct) {
    return (
      <div className={style['product-details__not-found']}>
        <h2 className={style['product-details__not-found__title']}>
          Product was not found
        </h2>
        <img
          src="img/product-not-found.png"
          alt="Not found image"
          className={style['product-details__not-found__image']}
        />
      </div>
    );
  }

  return (
    <div className={style['product-details']}>
      <Breadcrumbs />
      <h2 className={style['product-details__name']}>{selectedProduct.name}</h2>
      <section className={style['product-details__details']}>
        <div className={style['product-details__details__info']}>
          <div className={style['product-details__details__gallery']}>
            <div
              className={
                style['product-details__details__gallery__preview-list']
              }
            >
              {selectedProduct.images.map(image => (
                <div
                  key={image}
                  className={`${
                    style[
                      'product-details__details__gallery__preview-list__item'
                    ]
                  }
                    ${image === productMainImage ? style['product-details__details__gallery__preview-list__item--active'] : ''}
                  `}
                  onClick={() => setProductMainImage(image)}
                >
                  <img
                    src={image}
                    alt="Product image"
                    className={
                      style['product-details__details__gallery__image']
                    }
                  />
                </div>
              ))}
            </div>
            <div
              className={
                style['product-details__details__gallery__main-container']
              }
            >
              <img
                src={productMainImage || ''}
                alt="Product image"
                className={
                  style['product-details__details__gallery__main-image']
                }
              />
            </div>
          </div>
          <div className={style['product-details__details__main-controls']}>
            <div
              className={`${style['product-details__details__main-controls__section']} ${style['product-details__details__main-controls__section--first']}
              `}
            >
              <div
                className={
                  style[
                    'product-details__details__main-controls__section__wrapper'
                  ]
                }
              >
                <span
                  className={
                    style[
                      'product-details__details__main-controls__section__text'
                    ]
                  }
                >
                  Available colors
                </span>
                <span
                  className={`${style['product-details__details__main-controls__section__text']} ${style['product-details__details__main-controls__section__text--id']} ${style['product-details__details__main-controls__section__text--id--mobile']}`}
                >
                  {`ID: ${itemId}`}
                </span>
              </div>
              <div
                className={
                  style[
                    'product-details__details__main-controls__section__selectors'
                  ]
                }
              >
                {selectedProduct.colorsAvailable.map(color => {
                  const productOfThisColor = categoryProducts.find(
                    product =>
                      product.namespaceId === selectedProduct.namespaceId &&
                      product.color === color &&
                      product.capacity === selectedProduct.capacity,
                  );

                  if (!productOfThisColor) {
                    return null;
                  }

                  return (
                    <Link
                      to={`/${productOfThisColor.category}/${productOfThisColor.id}`}
                      key={color}
                      className={`${
                        style[
                          'product-details__details__main-controls__section__selectors__link'
                        ]
                      } ${
                        selectedProduct.color === color
                          ? style[
                              // eslint-disable-next-line prettier/prettier
                            'product-details__details__main-controls__section__selectors__link--active'
                            ]
                          : ''
                      }

                      `}
                    >
                      <div
                        style={{ backgroundColor: colorMap[color] }}
                        className={
                          style[
                            'product-details__details__main-controls__section__selectors__color'
                          ]
                        }
                      ></div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={
                style['product-details__details__main-controls__section']
              }
            >
              <span
                className={
                  style[
                    'product-details__details__main-controls__section__text'
                  ]
                }
              >
                Select capacity
              </span>
              <div
                className={
                  style[
                    'product-details__details__main-controls__section__selectors'
                  ]
                }
              >
                {selectedProduct.capacityAvailable.map(item => {
                  const productOfThisCapacity = categoryProducts.find(
                    product =>
                      product.namespaceId === selectedProduct.namespaceId &&
                      product.capacity === item &&
                      product.color === currentProductColor,
                  );

                  if (!productOfThisCapacity) {
                    return null;
                  }

                  return (
                    <Link
                      to={`/${productOfThisCapacity.category}/${productOfThisCapacity.id}`}
                      key={item}
                      className={`${
                        style[
                          'product-details__details__main-controls__section__selectors__capacity'
                        ]
                      } ${
                        selectedProduct.capacity === item
                          ? style[
                            'product-details__details__main-controls__section__selectors__capacity--active'
                            ]
                          : ''
                      }

                    `}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={
                style['product-details__details__main-controls__price-buttons']
              }
            >
              <div
                className={
                  style[
                    'product-details__details__main-controls__price-buttons__price'
                  ]
                }
              >
                <span
                  className={
                    style[
                      'product-details__details__main-controls__price-buttons__price--discount'
                    ]
                  }
                >{`$${selectedProduct.priceDiscount}`}</span>
                <span
                  className={
                    style[
                      'product-details__details__main-controls__price-buttons__price--regular'
                    ]
                  }
                >{`$${selectedProduct.priceRegular}`}</span>
              </div>
              {productPreview && <Buttons product={productPreview} />}
              <div
                className={
                  style['product-details__details__main-controls__tech-spec']
                }
              >
                <ul
                  className={
                    style[
                      'product-details__details__main-controls__tech-spec__list'
                    ]
                  }
                >
                  <li
                    className={
                      style[
                        'product-details__details__main-controls__tech-spec__item'
                      ]
                    }
                  >
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__name'
                        ]
                      }
                    >
                      Screen
                    </span>
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__value'
                        ]
                      }
                    >
                      {selectedProduct.screen}
                    </span>
                  </li>
                  <li
                    className={
                      style[
                        'product-details__details__main-controls__tech-spec__item'
                      ]
                    }
                  >
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__name'
                        ]
                      }
                    >
                      Resolution
                    </span>
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__value'
                        ]
                      }
                    >
                      {selectedProduct.resolution}
                    </span>
                  </li>
                  <li
                    className={
                      style[
                        'product-details__details__main-controls__tech-spec__item'
                      ]
                    }
                  >
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__name'
                        ]
                      }
                    >
                      Processor
                    </span>
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__value'
                        ]
                      }
                    >
                      {selectedProduct.processor}
                    </span>
                  </li>
                  <li
                    className={
                      style[
                        'product-details__details__main-controls__tech-spec__item'
                      ]
                    }
                  >
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__name'
                        ]
                      }
                    >
                      RAM
                    </span>
                    <span
                      className={
                        style[
                          'product-details__details__main-controls__tech-spec__value'
                        ]
                      }
                    >
                      {selectedProduct.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span
            className={`${style['product-details__details__main-controls__section__text']} ${style['product-details__details__main-controls__section__text--id']} ${style['product-details__details__main-controls__section__text--id--big-screen']}`}
          >
            {`ID: ${itemId}`}
          </span>
        </div>
      </section>
      <div className={style['product-details__sections']}>
        <section className={style['product-details__about']}>
          <h3 className={style['product-details__h3']}>About</h3>
          {selectedProduct.description.map((info, index) => (
            <article
              key={index}
              className={style['product-details__about__section']}
            >
              <h4 className={style['product-details__about__section__h4']}>
                {info.title}
              </h4>
              {info.text.map((p, i) => (
                <p
                  key={i}
                  className={style['product-details__about__section__p']}
                >
                  {p}
                </p>
              ))}
            </article>
          ))}
        </section>
        <section className={style['product-details__tech-specs']}>
          <h3 className={style['product-details__h3']}>Tech specs</h3>
          <ul className={style['product-details__tech-specs__list']}>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Screen
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.screen}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Resolution
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.resolution}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Processor
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.processor}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                RAM
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.ram}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Built in memory
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.capacity}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Camera
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.camera}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Zoom
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.zoom}
              </span>
            </li>
            <li className={style['product-details__tech-specs__item']}>
              <span
                className={style['product-details__tech-specs__item__name']}
              >
                Cell
              </span>
              <span
                className={style['product-details__tech-specs__item__value']}
              >
                {selectedProduct.cell.join(', ')}
              </span>
            </li>
          </ul>
        </section>
        <section className={style['product-details__suggestions']}>
          <ProductsSlider
            products={suggestionProducts}
            title={BlockTitle.Suggestions}
          />
        </section>
      </div>
    </div>
  );
};
