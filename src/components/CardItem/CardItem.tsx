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
  const [singleProduct, setSingleProduct] = useState<ProductType>();
  const [activePhoto, setActivePhoto] = useState<string>();
  const [alsoLikeProducts, setAlsoLikeProducts] = useState<ProductAllType[]>(
    [],
  );
  const [productFromDB, setProductFromDB] = useState<ProductAllType[]>([]);

  const [activeProduct, setActiveProduct] = useState<ProductAllType | null>();

  useEffect(() => {
    const fetchProduct = async () => {
      const newProduct = await getProduct(state.product.category, id!);

      setSingleProduct(newProduct);

      alsoLikeProducts.length === 0 &&
        setAlsoLikeProducts(
          (await getProducts('allProducts')).slice(0, 10) as ProductAllType[],
        );
    };

    fetchProduct();
  }, [id, singleProduct]);

  useEffect(() => {
    setActivePhoto(singleProduct?.images[0] || unnownImg);
  }, [singleProduct, state]);

  useEffect(() => {
    const fetchActiveProduct = async () => {
      if (productFromDB.length === 0) {
        const products = await getProducts('allProducts');

        setProductFromDB(products as ProductAllType[]);
      }

      setActiveProduct(
        (productFromDB as ProductAllType[]).find(item => item.itemId === id) ||
          null,
      );
    };

    fetchActiveProduct();
  }, [id, activeProduct, singleProduct]);

  const productTech = [
    { name: 'Screen', value: singleProduct?.screen },
    { name: 'Resolution', value: singleProduct?.resolution },
    { name: 'Processor', value: singleProduct?.processor },
    { name: 'RAM', value: singleProduct?.ram },
    { name: 'Camera', value: singleProduct?.camera },
    { name: 'Zoom', value: singleProduct?.zoom },
    { name: 'Cell', value: [...(singleProduct?.cell || [])].join(', ') },
  ];

  if (!singleProduct) {
    return <div>Товар не найден</div>;
  }

  return (
    <section className="card-item">
      <div className="container card-item__container">
        <Breadcrumbs />

        <h2 className="card-item__title h2">{singleProduct.name}</h2>
        <div className="card-item__body body-card">
          <div className="body-card__wrapper">
            <div className="body-card__images">
              <ul className="body-card__slider-photos">
                {singleProduct.images.map(item => {
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
                        aria-label={`Показать фото ${singleProduct.name}`}
                      >
                        <img
                          src={`./${item}`}
                          alt={singleProduct.name}
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
                  src={`./${activePhoto}`}
                  alt={`${singleProduct.name} — главное фото`}
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
                  {singleProduct.colorsAvailable.map(color => {
                    const newColor =
                      color === 'space gray' ? 'space-gray' : color;
                    const item = pathname.replace(
                      singleProduct.color === 'space gray'
                        ? 'space-gray'
                        : singleProduct.color,
                      newColor,
                    );

                    return (
                      <li
                        className="body-card__item body-card__item-block-color"
                        key={color}
                      >
                        <NavLink
                          to={`${item}`}
                          state={state}
                          className={({ isActive }) =>
                            `body-card__item-link ${isActive ? 'body-card__item-color--active' : ''}`
                          }
                        >
                          <span
                            className={`body-card__item-color body-card__item-color--${newColor}`}
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
                  {singleProduct.capacityAvailable.map(capacity => {
                    const link = pathname.replace(
                      singleProduct.capacity.toLowerCase(),
                      capacity.toLowerCase(),
                    );

                    return (
                      <li className={'body-card__item'} key={capacity}>
                        <NavLink
                          to={`${link}`}
                          state={state}
                          className={({ isActive }) =>
                            `body-card__link ${isActive ? 'body-card__link--active' : ''}`
                          }
                        >
                          <span className="">{capacity}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="body-card__price  card__price">
                <div className="card__price-block">
                  <span className="card__price--sale">
                    ${singleProduct.priceDiscount}
                  </span>
                  <span className="card__price--full">
                    ${singleProduct.priceRegular}
                  </span>
                </div>
                {activeProduct && (
                  <ProductCardButtons product={activeProduct} />
                )}
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
              <span className="body-card__id">ID: {activeProduct?.id}</span>
            </div>
          </div>

          <div className="body-card__descritption descritption">
            <div className="descritption__main">
              <h3 className="descritption__title h3 separator">About</h3>

              {singleProduct.description.map(({ text, title }) => (
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
                {productTech.map(
                  ({ name, value }) =>
                    value && (
                      <li className="param__descritption" key={name}>
                        <span className="param__name">{name}</span>
                        <span className="param__value">{value}</span>
                      </li>
                    ),
                )}
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

/**
 *
 * Проблема, возможно, связана с тем, что вы используете newColor для замены singleProduct.color в pathname. Однако, newColor используется только для отображения цвета в компоненте, а не для обновления состояния.

Вместо этого, вы должны обновить состояние color при изменении pathname. Вы можете сделать это, используя хук useEffect с зависимостью от pathname.

Вот как это может выглядеть:

tsx
const [color, setColor] = useState<string>(singleProduct.color);

useEffect(() => {
  const newColor = pathname.split('/')[2];
  setColor(newColor === 'space gray' ? 'space-gray' : newColor);
}, [pathname]);

// ...

<NavLink
  to={`${item}`}
  state={state}
  className={({ isActive }) =>
    `body-card__item-link ${isActive ? 'body-card__item-color--active' : ''}`
  }
>
  <span
    className={`body-card__item-color body-card__item-color--${color}`}
  ></span>
</NavLink>
Здесь мы добавляем хук useEffect, который обновляет состояние color при изменении pathname. Мы также обновляем состояние color на singleProduct.color при загрузке компонента.

Затем, мы используем color вместо newColor в компоненте NavLink, чтобы отобразить правильный цвет.

Попробуйте добавить этот код в ваш компонент CardItem и проверьте, помогает ли это.
 *
 *
 */
