import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../Catalog/Breadcrumbs';
import unnownImg from './../../../public/img/unnown.jpg';
import classNames from 'classnames';
import './CardItem.scss';
import allProducts from '../../../public/api/products.json';
import { PromotionSlider } from '../PromotionSlider';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { ProductCardButtons } from '../ProductCard/ProductCardButtons';
import { useProducts } from '../../context/ProductsContext';
import { NameCategory, NameProducts } from '../../types/NameProducts';
import { getProduct } from '../../api/httpsRequest';
import { ProductType, ProductTypeForAccessory } from '../../types/Product';

export const CardItem = () => {
  // const product = {
  //   id: 'apple-iphone-7-plus-32gb-silver',
  //   category: 'phones',
  //   namespaceId: 'apple-iphone-7-plus',
  //   name: 'Apple iPhone 7 Plus 32GB Silver',
  //   capacityAvailable: ['32GB', '64GB'],
  //   capacity: '32GB',
  //   priceRegular: 540,
  //   priceDiscount: 500,
  //   colorsAvailable: ['black', 'mistyrose', 'gold', 'silver'],
  //   color: 'silver',
  //   images: [
  //     'img/phones/apple-iphone-7-plus/silver/00.webp',
  //     'img/phones/apple-iphone-7-plus/silver/01.webp',
  //     'img/phones/apple-iphone-7-plus/silver/02.webp',
  //     'img/phones/apple-iphone-7-plus/silver/03.webp',
  //     'img/phones/apple-iphone-7-plus/silver/04.webp',
  //   ],
  //   description: [
  //     {
  //       title: 'And then there was Pro',
  //       text: [
  //         'A transformative triple-camera system that adds tons of capability without complexity.',
  //         'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
  //       ],
  //     },
  //     {
  //       title: 'Camera',
  //       text: [
  //         'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
  //       ],
  //     },
  //     {
  //       title:
  //         'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
  //       text: [
  //         'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
  //       ],
  //     },
  //   ],
  //   screen: "5.5' IPS",
  //   resolution: '1920x1080',
  //   processor: 'Apple A10',
  //   ram: '3GB',
  //   camera: '12 Mp + 7 Mp',
  //   zoom: 'Digital, 10x / Optical, 2x',
  //   cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE'],
  // };

  const { id } = useParams<{ id: string }>();
  const { pathname, state } = useLocation();
  const { findNessesaryItem } = useProducts();
  const [product, setProduct] = useState<
    ProductType | ProductTypeForAccessory | undefined
  >(undefined);

  useEffect(() => {
    const fetchProduct = async () => {
      const newProduct = await getProduct(category, id!);
      console.log('newProduct', newProduct);
      setProduct(newProduct);
    };
    fetchProduct();
  }, [id]);
  // Получаем категорию из пути (первый сегмент: phones, tablets, accessories)
  const category = state.category;

  console.log('state', state);
  console.log('product', product);

  const alsoLikeProducts = allProducts.slice(0, 5);

  const [activePhoto, setActivePhoto] = useState(
    product?.images[0] || unnownImg,
  );

  const productTech = [
    { name: 'Screen', value: product?.screen },
    { name: 'Resolution', value: product?.resolution },
    { name: 'Processor', value: product?.processor },
    { name: 'RAM', value: product?.ram },
    // { name: 'Camera', value: product?.camera },
    // { name: 'Zoom', value: product?.zoom },
    // { name: 'Cell', value: [...product.cell].join(', ') },
  ];

  // const chosenProduct =
  //   allProducts.find(
  //     (item: { itemId: string }) => item.itemId === product.id,
  //   ) || product;

  // const productId = useMemo(() => {
  //   return Math.floor(Math.random() * 1000000);
  // }, []);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <section className="card-item">
      <div className="container card-item__container">
        <Breadcrumbs />

        <h2 className="card-item__title h2">{product.id}</h2>
        <div className="card-item__body body-card">
          <div className="body-card__wrapper">
            <div className="body-card__images">
              <ul className="body-card__slider-photos">
                {product.images.map(item => {
                  const isActive = item === activePhoto;
                  return (
                    <li
                      key={item}
                      className="body-card__slider-item"
                      onClick={() => setActivePhoto(item)}
                    >
                      <button
                        type="button"
                        className={classNames('body-card__thumb-btn', {
                          'body-card__thumb-btn--active': isActive,
                        })}
                        onClick={() => setActivePhoto(item)}
                        aria-pressed={isActive}
                        aria-label={`Показать фото ${product.name}`}
                      >
                        <img
                          src={`../${item}`}
                          alt={product.name}
                          className="body-card__slider-photo"
                          loading="lazy"
                          width="80"
                          height="80"
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="body-card__main-photo">
                <img
                  src={`../${activePhoto}`}
                  alt={`${product.name} — главное фото`}
                  className="body-card__main-img"
                  loading="lazy"
                  width="462"
                  height="462"
                />
              </div>
            </div>

            <div className="body-card__info">
              <div className="body-card__colors separator">
                <div className="body-card__info-name">Available colors</div>
                <ul className="body-card__items">
                  {product.colorsAvailable.map(color => (
                    <li
                      className="body-card__item body-card__item-block-color"
                      key={color}
                    >
                      <NavLink
                        to={`./${color}`}
                        className={({ isActive }) =>
                          `body-card__item-color body-card__item-color--${color} ${isActive ? 'body-card__item-color--active' : ''}`
                        }
                      ></NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="body-card__capacity separator">
                <div className="body-card__info-name">Select capacity</div>
                <ul className="body-card__items">
                  {product.capacityAvailable.map(capacity => (
                    <li
                      className="body-card__item body-card__item-block-capacity"
                      //! 'body-card__item-block-capacity--active' added conditionally
                      key={capacity}
                    >
                      <span
                        className={classNames(
                          'body-card__item-capacity',
                          capacity,
                        )}
                      >
                        {capacity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="body-card__price  card__price">
                <div className="card__price-block">
                  <span className="card__price--sale">
                    ${product.priceDiscount}
                  </span>
                  <span className="card__price--full">
                    ${product.priceRegular}
                  </span>
                </div>
                <ProductCardButtons product={state} />
              </div>

              <ul className="body-card__param param">
                {productTech.map(
                  ({ name, value }, index) =>
                    index < 4 && (
                      <li className="param__descritption" key={name}>
                        <span className="param__name">{name}</span>
                        <span className="param__value">{value}</span>
                      </li>
                    ),
                )}
              </ul>
              {/* <span className="body-card__id">ID: {productId}</span> */}
            </div>
          </div>

          <div className="body-card__descritption descritption">
            <div className="descritption__main">
              <h3 className="descritption__title h3 separator">About</h3>

              {product.description.map(({ text, title }) => (
                <div className="descritption__block" key={title}>
                  <h4 className="descritption__name h4">{title}</h4>
                  <div className="descritption__text">
                    {text.map(item => (
                      <p className="descritption__paragraph" key={item}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="descritption__tech">
              <h3 className="descritption__title h3 separator">Tech specs</h3>
              {/* <ul className="descritption__info param">
                {productTech.map(({ name, value }) => (
                  <li className="param__descritption" key={name}>
                    <span className="param__name">{name}</span>
                    <span className="param__value">{value}</span>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
      </div>

      <PromotionSlider
        products={alsoLikeProducts}
        title={'You may also like'}
      />
    </section>
  );
};
