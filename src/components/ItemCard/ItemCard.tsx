import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './ItemCard.module.scss';
import productsFromServer from '../../api/products.json';
import { useAppContext } from '../../AppContext';
import { Phone } from '../../types/PhoneType';
import { Accessories } from '../../types/Accessories';
import { Navigation } from '../Navigation';
import {
  getDetailedAccessories,
  getDetailedPhones,
  getDetailedTablets,
} from '../../api';
import { Loader } from '../Loader';
import { Footer } from '../Footer';
import { Carousel } from '../HomePage/Models/Carousel';

interface Props {
  swiperIndex: number;
}

export const ItemCard: React.FC<Props> = ({ swiperIndex }) => {
  const { currentPage, favourites, setFavourites, cart, setCart } =
    useAppContext();
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const startWith = location.pathname.split('/').pop();
  const [model, setModel] = useState<Phone | Accessories | null>(null);
  const [activeColor, setActiveColor] = useState<string | undefined>(startWith);
  const [activeCapacity, setActiveCapacity] = useState<string | undefined>(
    startWith,
  );
  const [mainImage, setMainImage] = useState(0);
  const [loading, setLoading] = useState(false);

  const relatedItems = productsFromServer
    .filter(item => item.category === category)
    .filter(item => item.itemId !== model?.id);

  const selected = favourites.find(item => item.itemId === model?.id);
  const add = cart.find(item => item.itemId === model?.id);

  const handleFindId = (id: string) => {
    const findedId = productsFromServer.find(item => item.itemId === id);

    return findedId?.id;
  };

  const handleChangeColor = () => {
    const firstPart = location.pathname.split('/');
    const secondPart = firstPart
      .slice(2)
      .join('-')
      .split('-')
      .slice(0, -1)
      .join('-');

    return `/${firstPart[1]}/${secondPart}`;
  };

  const handleChangeCapacity = () => {
    const firstPart = location.pathname.split('/');
    const seconPart = firstPart
      .slice(2)
      .join('-')
      .split('-')
      .slice(0, -2)
      .join('-');

    return `/${firstPart[1]}/${seconPart}`;
  };

  const handleAddToCart = () => {
    const itemToAdd = productsFromServer.find(
      item => item.itemId === model?.id,
    );

    if (itemToAdd) {
      if (cart.some(item => item.id === itemToAdd.id)) {
        // object already exist in cart, so delete the item
        setCart(prevCart => prevCart.filter(item => item.id !== itemToAdd.id));
      } else {
        // object doesn't exist in cart, so add item
        setCart(prevCart => [...prevCart, itemToAdd]);
      }
    }
  };

  const handleAddToFavourites = () => {
    const itemToAdd = productsFromServer.find(
      item => item.itemId === model?.id,
    );

    if (itemToAdd) {
      if (favourites.some(item => item.id === itemToAdd.id)) {
        // object already exist in favourites, so delete the item
        setFavourites(prevFavourites =>
          prevFavourites.filter(item => item.id !== itemToAdd.id),
        );
      } else {
        // object doesn't exist in favourites, so add item
        setFavourites(prevFavourites => [...prevFavourites, itemToAdd]);
      }
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      let fetchedModel: Phone | Accessories | null = null;

      switch (category) {
        case 'phones':
          const detailedPhones = await getDetailedPhones();

          fetchedModel =
            detailedPhones.find(phone => phone.id === productId) || null;
          break;
        case 'tablets':
          const detailedTablets = await getDetailedTablets();

          fetchedModel =
            detailedTablets.find(tablets => tablets.id === productId) || null;
          break;
        case 'accessories':
          const detailedAccessories = await getDetailedAccessories();

          fetchedModel =
            detailedAccessories.find(
              accessories => accessories.id === productId,
            ) || null;
          break;
        default:
          fetchedModel = null;
      }

      setModel(fetchedModel);
      setLoading(false);
    };

    fetchData();
  }, [category, productId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page">
      {model ? (
        <section className={styles.details}>
          <div className={styles.details__container}>
            <Navigation
              category={category}
              currentPage={currentPage}
              back
              model={model}
            />
            <h2 className={styles.details__title}>{model.name}</h2>
            <div className={styles.details__content}>
              <div className={styles.details__main}>
                <div className={styles.details__photos}>
                  <div className={styles['details__main-image']}>
                    <img
                      className={styles['details__main-photo']}
                      src={model.images[mainImage]}
                      alt="product"
                    />
                  </div>
                  <div className={styles['details__side-photos']}>
                    {model.images.map((image, index) => (
                      <img
                        key={image}
                        className={cn(styles.details__image, {
                          [styles['details__image--active']]:
                            mainImage === index,
                        })}
                        src={image}
                        alt="product"
                        onClick={() => setMainImage(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.details__customization}>
                  <div className={styles.details__type}>
                    <p className={styles['details__type-name']}>
                      Available colors
                    </p>
                    <p className={styles.details__id}>
                      {`ID: ${handleFindId(model.id)}`}
                    </p>
                    <div className={styles.details__items}>
                      {model.colorsAvailable.map(color => (
                        <Link
                          to={`${handleChangeColor()}-${color}`}
                          className={cn(styles.details__wrapper, {
                            [styles['details__wrapper--active']]:
                              color === activeColor,
                          })}
                          key={color}
                          onClick={() => setActiveColor(color)}
                        >
                          <span
                            className={styles.details__color}
                            style={{ backgroundColor: color }}
                          ></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={styles.details__type}>
                    <p className={styles['details__type-name']}>
                      Select capacity
                    </p>
                    <div className={styles.details__items}>
                      {model.capacityAvailable.map(capacity => (
                        <Link
                          to={`${handleChangeCapacity()}-${capacity.toLowerCase()}-${activeColor}`}
                          key={capacity}
                          className={cn(styles.details__memory, {
                            [styles['details__memory--active']]:
                              activeCapacity === capacity,
                          })}
                          onClick={() => setActiveCapacity(capacity)}
                        >
                          <p
                            className={cn(styles.details__amount, {
                              [styles['details__amount--active']]:
                                activeCapacity === capacity,
                            })}
                          >
                            {capacity}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={styles.details__buy}>
                    <div className={styles.details__checkout}>
                      <p className={styles.details__price}>
                        {`$${model.priceDiscount}`}
                      </p>
                      <p
                        className={`${styles.details__price} ${styles['details__price--discount']}`}
                      >
                        {`$${model.priceRegular}`}
                      </p>
                    </div>
                    <div className={styles.details__buttons}>
                      {!add ? (
                        <button
                          className={styles['details__add-to-cart']}
                          onClick={handleAddToCart}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className={`${styles['details__add-to-cart']} ${styles['details__add-to-cart--added']}`}
                          onClick={handleAddToCart}
                        >
                          Added
                        </button>
                      )}
                      {!selected ? (
                        <button
                          className={`${styles['details__add-to-favorite']} ${styles['details__add-to-favorite--default']}`}
                          onClick={handleAddToFavourites}
                        ></button>
                      ) : (
                        <button
                          className={`${styles['details__add-to-favorite']} ${styles['details__add-to-favorite--selected']}`}
                          onClick={handleAddToFavourites}
                        ></button>
                      )}
                    </div>
                    <div className={styles.details__characteristic}>
                      <div className={styles.details__info}>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>Screen</p>
                          <p className={styles.details__value}>
                            {model.screen.slice(0, 9)}
                          </p>
                        </div>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>Resolution</p>
                          <p className={styles.details__value}>
                            {model.resolution}
                          </p>
                        </div>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>Processor</p>
                          <p className={styles.details__value}>
                            {model.processor}
                          </p>
                        </div>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>RAM</p>
                          <p className={styles.details__value}>{model.ram}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.details__about}>
                <div className={styles.details__part}>
                  <h3
                    className={`${styles.details__title} ${styles['details__title--about']}`}
                  >
                    About
                  </h3>
                  {model.description.map(item => (
                    <div
                      className={styles.details__description}
                      key={item.title}
                    >
                      <h4 className={styles.details__name}>{item.title}</h4>
                      <p className={styles.details__subtitle}>{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.details__part}>
                  <h3
                    className={`${styles.details__title} ${styles['details__title--about']}`}
                  >
                    Tech specs
                  </h3>
                  <div className={styles.details__info}>
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>Screen</p>
                      <p className={styles.details__value}>
                        {model.screen.slice(0, 9)}
                      </p>
                    </div>
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>Resolution</p>
                      <p className={styles.details__value}>
                        {model.resolution}
                      </p>
                    </div>
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>Processor</p>
                      <p className={styles.details__value}>{model.processor}</p>
                    </div>
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>RAM</p>
                      <p className={styles.details__value}>{model.ram}</p>
                    </div>
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>Built in memory</p>
                      <p className={styles.details__value}>{model.capacity}</p>
                    </div>
                    {model && 'camera' in model && 'zoom' in model && (
                      <>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>Camera</p>
                          <p className={styles.details__value}>
                            {(model as Phone).camera}
                          </p>
                        </div>
                        <div className={styles.details__block}>
                          <p className={styles.details__point}>Zoom</p>
                          <p className={styles.details__value}>
                            {(model as Phone).zoom}
                          </p>
                        </div>
                      </>
                    )}
                    <div className={styles.details__block}>
                      <p className={styles.details__point}>Cell</p>
                      <p className={styles.details__value}>
                        {model.cell.map((item, index) => (
                          <span key={index}>
                            {item}
                            {index !== model.cell.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['details__related-items']}>
              <div className={styles.details__navigation}>
                <h3 className={styles['details__title-related']}>
                  You may also like
                </h3>
                <div className={styles.details__arrows}>
                  <button
                    className={`${styles.details__button} ${styles['details__button--prev']} swiper-button-prev--${swiperIndex}`}
                  ></button>
                  <button
                    className={`${styles.details__button} ${styles['details__button--next']} swiper-button-next--${swiperIndex}`}
                  ></button>
                </div>
              </div>
              <Carousel
                swiperIndex={swiperIndex}
                modelsTitle="Hot prices"
                models={relatedItems}
              />
            </div>
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}
      <Footer />
    </div>
  );
};
