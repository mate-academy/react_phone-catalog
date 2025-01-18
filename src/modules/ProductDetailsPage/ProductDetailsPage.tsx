/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import products from '../../../public/api/phones.json';
import '../../styles/Buttons.scss';
import style from './ProductDetailsPage.module.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectToCart } from '../../state/cartSlice';
import { addProduct, selectFavourites } from '../../state/favouriteSlice';
import { ProductNotFound } from '../../pages/ProductNotFound/ProductNotFound';
import { AlsoLike } from '../../components/ProductsSlider/AlsoLike';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const link = useNavigate();
  const location = useLocation();
  const favouriteProducts = useSelector(selectFavourites);
  const cartState = useSelector(selectToCart);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const dispatch = useDispatch();
  const item = products.find(product => product.id! === id);

  const colorMap: Record<string, string[]> = {
    midnight: ['#1D1D1F'],
    pink: ['#F9CDD9'],
    white: ['#F5F5F7'],
    black: ['#121212'],
    blue: ['#A2C5FF'],
    yellow: ['#FCE76A'],
    purple: ['#BF9BDE'],
    gold: ['#FAD7A1'],
    graphite: ['#4A4A4F'],
    red: ['#F44336'],
    green: ['#4CAF50'],
    midnightgreen: ['#004E43'],
    spacegray: ['#8E8E93'],
    silver: ['#D8D8D8'],
    rosegold: ['#F4C2C2'],
  };

  const getColorsById = (id: string): string[] => {
    return colorMap[id] || ['#000'];
  };

  const [largeImageSrc, setLargeImageSrc] = useState(
    item ? item.images[0] : '',
  );
  let newLink = '';

  useEffect(() => {
    if (item) {
      setLargeImageSrc(item.images[0]);
    }
  }, [item]);

  if (!item) {
    return <ProductNotFound />;
  }

  const changeColor = (color: string) => {
    if (!id) {
      return;
    }

    const delimiter = '-';
    const index = id.lastIndexOf(delimiter);

    newLink = index !== -1 ? id.substring(0, index) : id;

    newLink += delimiter + color;

    link('/phones/' + newLink);
  };

  const isInCart = () => {
    return cartState.some(cartItem => cartItem.id === item.id);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(addToCart(item));
  };

  const handleAddToFavourite = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(addProduct(item.id));
  };

  const changeCapacity = (capacity: string) => {
    if (!id) {
      return;
    }

    setSelectedCapacity(capacity.toLowerCase());
    capacity = capacity.toLowerCase();
    const newId = id.replace(/(?:-|\b)(\d+gb)(?:-|$)/i, `-${capacity}-`);

    link(`/phones/${newId}`);
  };

  const handleThumbnailClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    image: string,
  ) => {
    event.preventDefault();
    setLargeImageSrc(image);
  };

  const techSpec = [
    { key: 'Screen', value: item.screen },
    { key: 'Resolution', value: item.resolution },
    { key: 'Processor', value: item.processor },
    { key: 'Ram', value: item.ram },
    { key: 'Camera', value: item.camera },
    { key: 'Zoom', value: item.zoom },
    { key: 'Cell', value: item.cell },
  ];

  const handleBack = () => {
    const parentPath = location.pathname.split('/').slice(0, -1).join('/');

    link(parentPath);
  };

  return (
    <>
      <main className={style.item}>
        <section className={style.item__head}>
          <nav className={style.item__breadcrumbs}>
            <BreadCrumbs />
          </nav>
          <button className={style.item__back_button} onClick={handleBack}>
            &lt; Back
          </button>
          <h1 className={style.item__title}>{item.name}</h1>
        </section>

        <div className={style.half}>
          <section className={style.gallery}>
            <ul className={style.gallery__list}>
              {item.images.map((image, index) => (
                <li key={index}>
                  <a
                    href="#"
                    title={`Image ${index + 1}`}
                    onClick={event => handleThumbnailClick(event, image)}
                  >
                    <img
                      src={image}
                      className={(style.gallery__img, style.gallery__thumb)}
                      alt={`thumb ${index + 1}`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className={style.gallery__large}>
              <img
                src={largeImageSrc}
                alt="main image"
                className={(style.gallery__img, style.gallery__large_img)}
              />
            </div>
          </section>

          <section className={style.item__details}>
            <article className={style.item__color}>
              <div className={style.item__color_id}>
                <h2>Available Colors</h2>
                <p>ID 12341</p>
              </div>
              <div className={style.item__colors_palette}>
                {item.colorsAvailable.map(color => (
                  <button
                    key={color}
                    style={{ backgroundColor: getColorsById(color)[0] }}
                    onClick={() => changeColor(color)}
                  ></button>
                ))}
              </div>
            </article>
            <div className={style.divider}></div>
            <article className={style.item__capacity}>
              <h2>Available Capacities</h2>
              <div className={style.item__capacity_button_list}>
                {item.capacityAvailable.map(capacity => (
                  <button
                    className={`${style.item__capacity_button} ${selectedCapacity === capacity.toLowerCase() ? style.item__capacity_button_active : ''}`}
                    key={capacity}
                    onClick={() => changeCapacity(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
              <div className={style.divider}></div>
            </article>
            <p className={style.item__price}>${item.priceRegular}</p>
            <article className={style.item__buttons}>
              <button
                className={
                  isInCart()
                    ? 'button__btn_buy button__btn_buy--active'
                    : 'button__btn_buy'
                }
                aria-label="Add to cart"
                onClick={handleAddToCart}
              >
                {isInCart() ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                className={
                  favouriteProducts.includes(item.id)
                    ? ' button__btn_fav button__btn_fav--active'
                    : 'button__btn_fav'
                }
                onClick={handleAddToFavourite}
              ></button>
            </article>
            <article className={style.item__spec}>
              <dl className={style.item__spec_list}>
                <div className={style.item__spec_row}>
                  <dt className={style.item__spec_key}>Camera</dt>
                  <dd className={style.item__spec_value}>{item.camera}</dd>
                </div>
                <div className={style.item__spec_row}>
                  <dt className={style.item__spec_key}>Screen</dt>
                  <dd className={style.item__spec_value}>{item.screen}</dd>
                </div>
                <div className={style.item__spec_row}>
                  <dt className={style.item__spec_key}>Zoom</dt>
                  <dd className={style.item__spec_value}>{item.zoom}</dd>
                </div>
              </dl>
            </article>
          </section>
        </div>

        <div className={style.half}>
          <section className={style.item__about}>
            <h3>About</h3>
            <div className={style.divider}></div>
            {item.description.map(desc => (
              <article key={desc.title} className={style.item__about_article}>
                <h4 className={style.item__about_title}>{desc.title}</h4>
                <p className={style.item__about_description}>{desc.text}</p>
              </article>
            ))}
          </section>
          <section>
            <article className={style.item__tech_spec}>
              <h3>Tech spec</h3>
              <div className={style.divider}></div>
              <dl className={style.item__spec_list}>
                {techSpec.map(({ key, value }) => (
                  <div className={style.item__spec_row} key={key}>
                    <dt className={style.item__spec_key}>{key}</dt>
                    <dd className={style.item__spec_value}>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </section>
        </div>
        <AlsoLike />
      </main>
    </>
  );
};
