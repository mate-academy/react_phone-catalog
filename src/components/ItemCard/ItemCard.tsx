import React, { useEffect, useState } from 'react';
import styles from './ItemCard.module.scss';
import { Footer } from '../Footer';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Phone } from '../../types/PhoneType';
import { Accessories } from '../../types/AccessoriesType';
import classNames from 'classnames';
import productsFromServer from '../../api/products.json';
import { useAppContext } from '../../AppContext';
import { Carousel } from '../HomePage/Models/Carousel';
import { Navigation } from '../Navigation';
import { Loader } from '../Loader';
import {
  getDetailedAccessories,
  getDetailedPhones,
  getDetailedTablets,
} from '../../api';

interface Props {
  swiperIndex: number;
}

export const ItemCard: React.FC<Props> = ({ swiperIndex }) => {
  const { favourites, setFavourites, cart, setCart, currentPage } =
    useAppContext();
  const { productId } = useParams();
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const [model, setModel] = useState<Phone | Accessories | null>(null);
  const [mainImage, setMainImage] = useState(0);
  const firstColor = location.pathname.split('/').pop();
  const [activeColor, setActiveColor] = useState<string | undefined>(
    firstColor,
  );
  const [startMemory, setStartMemory] = useState<string | undefined>(
    firstColor,
  );
  const [loading, setLoading] = useState(false);

  const relatedItems = productsFromServer
    .filter(item => item.category === category)
    .filter(item => item.itemId !== model?.id);

  const handleChangeColor = () => {
    const pathParts = location.pathname.split('/');
    let secondPart = pathParts
      .slice(2)
      .join('-')
      .split('-')
      .slice(0, -1)
      .join('-');

    if (
      secondPart.indexOf('gb') + 2 !== secondPart.length &&
      secondPart.indexOf('gb') !== -1
    ) {
      secondPart = secondPart.slice(0, secondPart.indexOf('gb') + 2);
    }

    return `/${pathParts[1]}/${secondPart}`;
  };

  const handleChangeMemory = () => {
    const pathParts = location.pathname.split('/');
    let secondPart = pathParts
      .slice(2)
      .join('-')
      .split('-')
      .slice(0, -1)
      .join('-');

    if (
      secondPart.indexOf('gb') + 2 !== secondPart.length &&
      secondPart.indexOf('gb') !== -1
    ) {
      secondPart = secondPart.slice(0, secondPart.indexOf('gb') + 2);
    }

    return `/${pathParts[1]}/${secondPart}`;
  };

  const handleFindId = (id: string) => {
    const findedId = productsFromServer.find(item => item.itemId === id);

    return findedId?.id;
  };

  const selected = favourites.find(item => item.itemId === model?.id);
  const added = cart.find(item => item.itemId === model?.id);

  const handleAddFavourite = () => {
    const itemToAdd = productsFromServer.find(
      item => item.itemId === model?.id,
    );

    if (itemToAdd) {
      if (favourites.some(item => item.id === itemToAdd.id)) {
        setFavourites(prevFavourites =>
          prevFavourites.filter(item => item.id !== itemToAdd.id),
        );
      } else {
        setFavourites(prevFavourites => [...prevFavourites, itemToAdd]);
      }
    }
  };

  const handleAddCart = () => {
    const itemToAdd = productsFromServer.find(
      item => item.itemId === model?.id,
    );

    if (itemToAdd) {
      if (cart.some(item => item.id === itemToAdd.id)) {
        setCart(prevCart => prevCart.filter(item => item.id !== itemToAdd.id));
      } else {
        setCart(prevCart => [...prevCart, itemToAdd]);
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

          fetchedModel = detailedPhones.find(p => p.id === productId) || null;
          break;
        case 'tablets':
          const detailedTablets = await getDetailedTablets();

          fetchedModel = detailedTablets.find(t => t.id === productId) || null;
          break;
        case 'accessories':
          const detailedAccessories = await getDetailedAccessories();

          fetchedModel =
            detailedAccessories.find(a => a.id === productId) || null;
          break;
        default:
          fetchedModel = null;
      }

      setModel(fetchedModel);
      if (fetchedModel) {
        setActiveColor(firstColor || fetchedModel.colorsAvailable[0]);
        setStartMemory(fetchedModel.capacityAvailable[0]);
      }

      setLoading(false);
    };

    fetchData();
  }, [category, productId, firstColor]);

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
                        className={classNames(styles.details__image, {
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
                      {model.colorsAvailable.map(color => {
                        let colorScss;
                        const colorURL = color.split(' ').join('-');

                        if (color === 'spacegray') {
                          colorScss = '#707070';
                        } else if (color === 'rose gold') {
                          colorScss = '#ffe8e5';
                        } else if (color === 'sky blue') {
                          colorScss = '#87cefa';
                        } else if (color === 'starlight') {
                          colorScss = '#f8f9ec';
                        } else if (color === 'sierrablue') {
                          colorScss = '#Bfdaf7';
                        } else if (color === 'graphite') {
                          colorScss = '#4b4e53';
                        } else if (color === 'spaceblack') {
                          colorScss = '#182030';
                        } else {
                          colorScss = color;
                        }

                        return (
                          <Link
                            to={`${handleChangeColor()}-${colorURL}`}
                            className={classNames(styles.details__wrapper, {
                              [styles['details__wrapper--active']]:
                                color === activeColor,
                            })}
                            key={color}
                            onClick={() => {
                              return setActiveColor(color);
                            }}
                          >
                            <span
                              className={styles.details__color}
                              style={{ backgroundColor: colorScss }}
                            ></span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className={styles.details__type}>
                    <p className={styles['details__type-name']}>
                      Select capacity
                    </p>
                    <div className={styles.details__items}>
                      {model.capacityAvailable.map(memory => (
                        <Link
                          to={`${handleChangeMemory()}-${memory.toLowerCase()}-${activeColor}`}
                          key={memory}
                          className={classNames(styles.details__memory, {
                            [styles['details__memory--active']]:
                              startMemory === memory,
                          })}
                          onClick={() => setStartMemory(memory)}
                        >
                          <p
                            className={classNames(styles.details__amount, {
                              [styles['details__amount--active']]:
                                startMemory === memory,
                            })}
                          >
                            {memory}
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
                      {!added ? (
                        <button
                          className={styles['details__add-to-cart']}
                          onClick={handleAddCart}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className={`${styles['details__add-to-cart']} ${styles['details__add-to-cart--added']}`}
                          onClick={handleAddCart}
                        >
                          Added
                        </button>
                      )}
                      {!selected ? (
                        <button
                          className={`${styles['details__add-to-favorite']} ${styles['details__add-to-favorite--default']}`}
                          onClick={handleAddFavourite}
                        ></button>
                      ) : (
                        <button
                          className={`${styles['details__add-to-favorite']} ${styles['details__add-to-favorite--selected']}`}
                          onClick={handleAddFavourite}
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
                          <p className={styles.details__point}>Ram</p>
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
                      <p className={styles.details__point}>Ram</p>
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
