import { useContext, useEffect, useState } from 'react';
import { CardsCarusel } from '../Cards/CardsCarusel';
import styles from './InfoCard.module.scss';
import { Context } from '../../Store/Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDevice } from '../../api';
import { Device } from '../../type/Device';
import classNames from 'classnames';
import { BackButton } from '../../Functions/BackButton';
import { topScroll } from '../../Functions/ScrolTop/topScrol';
import { filterCategory } from '../../Functions/FilterCategory/filterCategory';

const getTech = (data: Device, size?: string) => {
  const { screen, resolution, processor, ram, capacity, camera, zoom, cell } =
    data;

  if (size === 'short') {
    return { screen, resolution, processor, ram };
  }

  return { screen, resolution, processor, ram, capacity, camera, zoom, cell };
};

const findProductById = (products: Device[], itemId: string) => {
  return products.find(product => product.id === itemId);
};

function capitalizeWords(str: string) {
  return str.replace(/\b\w+/g, (word: string) => {
    if (/^\d+gb$/i.test(word)) {
      return word.toUpperCase();
    }

    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export const InfoCard: React.FC = () => {
  const { products, favorite, setFavorite, carts, setCarts } =
    useContext(Context); // json телефонів phones,
  const { category, itemId } = useParams();
  const [device, setDevice] = useState<Device>();
  const [images, setImages] = useState<string[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    topScroll();
    if (category) {
      getDevice(category).then((data: Device[]) => {
        if (itemId) {
          const deviceById = findProductById(data, itemId);

          if (deviceById) {
            setDevice(deviceById);
            setImages(deviceById.images);
          }
        }
      });
    }
  }, [category, itemId]);

  const changeCurrent = (index: number) => {
    setCurrentIndex(index);
  };

  const HandlerAddFavorite = () => {
    const inFavoriteIndex = favorite.findIndex(
      fav => fav.itemId === device?.id,
    );

    if (inFavoriteIndex !== -1) {
      const updatedFavorites = [...favorite];

      updatedFavorites.splice(inFavoriteIndex, 1);
      setFavorite(updatedFavorites);
      localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
    } else {
      const productToAdd = products.find(prod => prod.itemId === device?.id);

      if (productToAdd) {
        setFavorite(prevFav => [...prevFav, productToAdd]);
      }
    }
  };

  const HandlerAddCart = () => {
    const inCartIndex = carts.findIndex(cart => cart.itemId === device?.id);

    if (inCartIndex !== -1) {
      const updatedCarts = [...carts];

      updatedCarts.splice(inCartIndex, 1);
      setCarts(updatedCarts);
      localStorage.setItem('carts', JSON.stringify(updatedCarts));
    } else {
      const productToAdd = products.find(prod => prod.itemId === device?.id);

      if (productToAdd) {
        setCarts(prevCarts => [...prevCarts, { count: 1, ...productToAdd }]);
      }
    }
  };

  const inFavorite = () => {
    return favorite.some(fav => {
      return fav.itemId === device?.id;
    });
  };

  const inCart = () => {
    return carts.some(cart => {
      return cart.itemId === device?.id;
    });
  };

  const HandlerChangeUrl = (item: string, find?: string) => {
    if (itemId) {
      const pathname = itemId.split('-');

      const findIndex = pathname.findIndex(
        elem =>
          elem.toLowerCase().includes('gb') ||
          elem.toLowerCase().includes('mm') ||
          elem.toLowerCase().includes('tb'),
      );

      if (
        (findIndex !== -1 && find === 'gb') ||
        find === 'tb' ||
        find === 'mm'
      ) {
        const newPathname = [...pathname];

        newPathname[findIndex] = item.toLowerCase();

        const newUrl = newPathname.join('-');

        navigate(`/info/${category}/${newUrl}`);
      }

      if (find === 'color') {
        const newPathname = [...pathname];

        newPathname[pathname.length - 1] = item.toLowerCase();

        const newUrl = newPathname.join('-');

        navigate(`/info/${category}/${newUrl}`);
      }
    }
  };

  const filterProducts = filterCategory(products, `${category}`);

  return (
    <div>
      <div className={styles.title}>
        <div className={styles.linkBlock}>
          <Link to={`/`}>
            <img src="img/icons/home_icon.svg" alt="home" />
          </Link>
          <span>
            <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
          </span>
          <Link to={`/phones`}>Phones</Link>
          <span>
            <img src="img/icons/Arrow_Right.svg" alt="arow_left" />
          </span>
          {itemId?.split('-').join(' ')}
        </div>
        <BackButton />

        <h2>{capitalizeWords((itemId ?? '').split('-').join(' '))}</h2>
      </div>
      <div className={styles.grid}>
        <div className={styles.container}>
          {images && (
            <div className={styles.image}>
              <div className={styles.imageSmall}>
                {images.map((img, index) => (
                  <div
                    className={classNames('', {
                      [styles.imgActive]: index === currentIndex,
                    })}
                    key={index}
                  >
                    <img
                      onClick={() => changeCurrent(index)}
                      className={styles.smallBlock}
                      src={`${img}`}
                      alt={`Phone ${index}`}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.imageLarge}>
                <img src={`${images[currentIndex]}`} alt="" />
              </div>
            </div>
          )}
          <div className={styles.options}>
            <div className={styles.optionsColors}>
              <p>Available colors</p>
              <ul className={styles.colorWrap}>
                {device?.colorsAvailable.map((element, idx) => {
                  return (
                    <li
                      className={classNames([styles.color], {
                        [styles.colorActive]: itemId
                          ?.split('-')
                          .includes(element.toLowerCase()),
                      })}
                      onClick={() => HandlerChangeUrl(element, 'color')}
                      key={idx}
                      style={{ background: element }}
                    />
                  );
                })}
              </ul>
            </div>
            <div className={styles.optionsMemory}>
              <p>Select capacity</p>
              <ul className={styles.memoryWrap}>
                {device?.capacityAvailable.map((item, idx) => {
                  return (
                    <li
                      className={classNames([styles.memory], {
                        [styles.isMemoryActive]: itemId
                          ?.split('-')
                          .includes(item.toLowerCase()),
                      })}
                      onClick={() => HandlerChangeUrl(item, 'gb')}
                      key={idx}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className={styles.optionsAddPrice}>
                <div
                  className={styles.price}
                >{`$${device?.priceDiscount}`}</div>
                <div
                  className={styles.fullPrice}
                >{`$${device?.priceRegular}`}</div>
              </div>

              <div className={styles.optionsAddButton}>
                <button
                  className={classNames([styles.button], {
                    [styles.isUnadd]: !inCart(),
                    [styles.isAdd]: inCart(),
                  })}
                  onClick={HandlerAddCart}
                >
                  Add to card
                </button>
                <button
                  className={classNames(
                    [styles.button],
                    [styles.isFavorite],
                    'fa-heart',
                    {
                      'fa-regular': !inFavorite(),
                      'fa-solid': inFavorite(),
                      [styles.red]: inFavorite(),
                    },
                  )}
                  onClick={HandlerAddFavorite}
                ></button>
              </div>

              <div>
                {device &&
                  Object.entries(getTech(device, 'short')).map(
                    ([key, value]) => {
                      return (
                        <div key={key}>
                          <div className={styles.techName}>
                            <p>{key}</p>
                          </div>
                          <div className={styles.techValue}>
                            {typeof value === 'object' ? (
                              <p>{value.join(', ')}</p>
                            ) : (
                              <p>{value}</p>
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          </div>
          <div className={styles.about}>
            <div className={styles.aboutTitle}>
              <h1>About</h1>
            </div>
            {device?.description.map((elem, index) => (
              <div className={styles.aboutBlock} key={index}>
                <h2>{elem.title}</h2>
                {elem.text.map((item, idx) => (
                  <p key={idx}>{item}</p>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.tech}>
            <div className={styles.techTitle}>
              <h1>Tech specs</h1>
            </div>
            {device &&
              Object.entries(getTech(device, 'full')).map(([key, value]) => {
                return (
                  <div className={styles.techProperty} key={key}>
                    <div className={styles.techName}>
                      <p>{key}</p>
                    </div>
                    <div className={styles.techValue}>
                      {typeof value === 'object' ? (
                        <p>{value.join(', ')}</p>
                      ) : (
                        <p>{value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={styles.Suggestions}>
          <CardsCarusel props={filterProducts} name={'You may also like'} />
        </div>
      </div>
    </div>
  );
};
