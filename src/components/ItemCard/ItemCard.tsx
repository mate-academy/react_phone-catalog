import React, { useEffect, useState } from 'react';
import styles from './ItemCard.module.scss';
import { Footer } from '../Footer';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Phone } from '../../types/PhoneType';
import phones from '../../api/phones.json';
import tablets from '../../api/tablets.json';
import accessories from '../../api/accessories.json';
import { Accessories } from '../../types/AccessoriesType';
import classNames from 'classnames';
import productsFromServer from '../../api/products.json';
import { useAppContext } from '../../AppContext';
import { Carousel } from '../HomePage/Models/Carousel';
import { Navigation } from '../Navigation';

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

  const relatedItems = productsFromServer
    .filter(item => item.category === category)
    .filter(item => item.itemId !== model?.id);

  const handleChangeColor = () => {
    const pathParts = location.pathname.split('/');
    const secondPart = pathParts
      .slice(2) // Починаємо з третього елементу (пропускаємо '#', 'category')
      .join('-') // Об'єднуємо в рядок
      .split('-') // Розділяємо на частини по '-'
      .slice(0, -1) // Відрізаємо останню частину
      .join('-'); // Знову об'єднуємо

    return `/${pathParts[1]}/${secondPart}`;
  };

  const handleChangeMemory = () => {
    const pathParts = location.pathname.split('/');
    const secondPart = pathParts
      .slice(2) // Починаємо з третього елементу (пропускаємо '#', 'category')
      .join('-') // Об'єднуємо в рядок
      .split('-') // Розділяємо на частини по '-'
      .slice(0, -2) // Відрізаємо останню частину
      .join('-'); // Знову об'єднуємо

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
      if (cart.some(item => item.id === itemToAdd.id)) {
        // Об'єкт вже є в корзині, видаляємо його
        setFavourites(prevFavourites =>
          prevFavourites.filter(item => item.id !== itemToAdd.id),
        );
      } else {
        // Об'єкт ще не в корзині, додаємо його
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
        // Об'єкт вже є в корзині, видаляємо його
        setCart(prevCart => prevCart.filter(item => item.id !== itemToAdd.id));
      } else {
        // Об'єкт ще не в корзині, додаємо його
        setCart(prevCart => [...prevCart, itemToAdd]);
      }
    }
  };

  useEffect(() => {
    const categoryModels = () => {
      switch (category) {
        case 'accessories':
          return accessories;
        case 'tablets':
          return tablets;
        default:
          return phones;
      }
    };

    const newModels = categoryModels();

    const newModel = newModels.find(
      visibleModels => visibleModels.id === productId,
    );

    if (newModel) {
      setModel(newModel);
      if (!firstColor || !newModel.colorsAvailable.includes(firstColor)) {
        setActiveColor(newModel.color);
        setStartMemory(newModel.capacity);
      } else {
        setActiveColor(firstColor);
        setStartMemory(startMemory);
      }
    } else {
      setModel(null);
    }
  }, [productId, category, firstColor, startMemory]);

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
                      {model.colorsAvailable.map(color => (
                        <Link
                          to={`${handleChangeColor()}-${color}`}
                          className={classNames(styles.details__wrapper, {
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
