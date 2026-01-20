import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../Catalog/Breadcrumbs';
import unnownImg from './../../../public/img/unnown.jpg';
import classNames from 'classnames';
import './CardItem.scss';
import { PromotionSlider } from '../PromotionSlider';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { ProductCardButtons } from '../ProductCard/ProductCardButtons';
import { getProduct, getProducts } from '../../api/httpsRequest';
import { ProductAllType, ProductType } from '../../types/Product';

export const CardItem = () => {
  const { id } = useParams<{ id: string }>();
  const { state, pathname } = useLocation();

  const [product, setProduct] = useState<ProductType>();
  const [activePhoto, setActivePhoto] = useState<string>();
  const [alsoLikeProducts, setAlsoLikeProducts] = useState<ProductAllType[]>(
    [],
  );

  useEffect(() => {
    const fetchProduct = async () => {
      const newProduct = await getProduct(state.category, id!);
      console.log('newProduct', newProduct);
      setProduct(newProduct);

      const products = (await getProducts('allProducts')).slice(0, 10);
      setAlsoLikeProducts(products as ProductAllType[]);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setActivePhoto(product?.images[0] || unnownImg);
  }, [product]);

  const productTech = [
    { name: 'Screen', value: product?.screen },
    { name: 'Resolution', value: product?.resolution },
    { name: 'Processor', value: product?.processor },
    { name: 'RAM', value: product?.ram },
    { name: 'Camera', value: product?.camera },
    { name: 'Zoom', value: product?.zoom },
    { name: 'Cell', value: [...(product?.cell || [])].join(', ') },
  ];

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
                  {product.colorsAvailable.map(color => {
                    const item = pathname.replace(product.color, color);
                    return (
                      <li
                        className="body-card__item body-card__item-block-color"
                        key={color}
                      >
                        <NavLink
                          to={`${item}`}
                          state={product}
                          className={({ isActive }) =>
                            `body-card__item-link ${isActive ? 'body-card__item-color--active' : ''}`
                          }
                        >
                          <span
                            className={`body-card__item-color body-card__item-color--${color}`}
                          ></span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="body-card__capacity separator">
                <div className="body-card__info-name">Select capacity</div>
                <ul className="body-card__items">
                  {product.capacityAvailable.map(capacity => {
                    const link = pathname.replace(product.capacity, capacity);
                    console.log('link', link);
                    console.log('product.capacity', product.capacity);
                    console.log('capacity', capacity);
                    return (
                      <li
                        className={classNames(
                          `body-card__item body-card__item-block-capacity`,
                        )}
                        //  {
                        //   'body-card__item-block-capacity--active':
                        //     capacity === product.capacity,
                        // },
                        key={capacity}
                      >
                        <NavLink
                          to={`${link}`}
                          state={product}
                          className={({ isActive }) =>
                            `body-card__item-capacity ${isActive ? 'body-card__item-block-capacity--active' : ''}`
                          }
                        >
                          {capacity}
                        </NavLink>
                      </li>
                    );
                  })}
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
              <span className="body-card__id">ID: {product.id}</span>
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
              <ul className="descritption__info param">
                {productTech.map(({ name, value }) => (
                  <li className="param__descritption" key={name}>
                    <span className="param__name">{name}</span>
                    <span className="param__value">{value}</span>
                  </li>
                ))}
              </ul>
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
