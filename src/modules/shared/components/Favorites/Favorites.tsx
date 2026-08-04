import { Link } from 'react-router-dom';
import styles from './Favorites.module.scss';
import { Products } from '../../types/Products';
import { useEffect, useMemo, useState } from 'react';
import { getAllDetailedProducts } from '../../utils/api';
import { useFavourites } from '../../contexts/FavouritesContext';
import { Loader } from '../Loader';
import classNames from 'classnames';

export const Favorites = () => {
  const [products, setProducts] = useState<Products[] | null>(null);
  const [loader, setLoader] = useState(false);

  const { addedDevice, favIconsId, toggleAdded, toggleFavourite } =
    useFavourites();

  useEffect(() => {
    setLoader(true);
    getAllDetailedProducts()
      .then(setProducts)
      .finally(() => setLoader(false));
  }, []);

  const devices = useMemo(() => {
    return products?.filter(product => favIconsId.includes(product.id)) ?? [];
  }, [products, favIconsId]);

  return (
    <div>
      <div className={styles.navigation}>
        <Link to="/">
          <img src="./img/home.svg" alt="homePhoto" />
        </Link>
        <img src="./img/arrowRight.svg" alt="arrowLeft" />
        <p className={styles.text}>Favourites</p>
      </div>

      <div className={styles.phone}>
        <div className={styles.title}>
          <h1>Favourites</h1>
          <p className={styles.text}>{devices.length} models</p>
        </div>

        {loader && <Loader />}

        {!loader && devices.length === 0 && (
          <div className={styles.products}>
            There are no favourites devices yet
          </div>
        )}

        {!loader && devices.length > 0 && (
          <>
            <div className={styles.products}>
              {devices.map(device => {
                const {
                  id,
                  name,
                  priceRegular,
                  priceDiscount,
                  screen,
                  capacity,
                  ram,
                  images,
                } = device;

                const isFavourite = favIconsId.includes(id);

                return (
                  <div className={styles.catalog} key={id}>
                    <Link to={`/product/${id}`} className={styles.catalogLink}>
                      <img
                        src={images[0]}
                        alt="photo"
                        className={styles.catalogPhoto}
                      />
                    </Link>
                    <Link to={`/product/${id}`} className={styles.catalogLink}>
                      <p className={styles.catalogName}>{name}</p>
                    </Link>

                    <div className={styles.catalogPrice}>
                      <p className={styles.catalogCurrentPrice}>
                        ${priceDiscount || priceRegular}
                      </p>

                      {priceDiscount && (
                        <p className={styles.catalogOldPrice}>
                          ${priceRegular}
                        </p>
                      )}
                    </div>

                    <div className={styles.catalogSettings}>
                      <table className={styles.table}>
                        <tbody>
                          <tr>
                            <td className={styles.title}>screen</td>
                            <td className={styles.result}>{screen}</td>
                          </tr>
                          <tr>
                            <td className={styles.title}>capacity</td>
                            <td className={styles.result}>{capacity}</td>
                          </tr>
                          <tr>
                            <td className={styles.title}>RAM</td>
                            <td className={styles.result}>{ram}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.catalogButtons}>
                      <button
                        className={classNames(styles.button, {
                          [styles.selectedPhone]: addedDevice.includes(id),
                          [styles.buttonsBuy]: !addedDevice.includes(id),
                        })}
                        onClick={() => {
                          toggleAdded(id);
                        }}
                      >
                        {addedDevice.includes(id) ? 'Selected' : 'Add to card'}
                      </button>
                      <button
                        className={classNames(
                          styles.button,
                          styles.buttonsLike,
                          'icons',
                        )}
                        onClick={() => {
                          toggleFavourite(id);
                        }}
                      >
                        <img
                          src={`${import.meta.env.BASE_URL}/img/${isFavourite ? 'likeClicked.svg' : 'like.svg'}`}
                          alt="logo"
                          className="logo"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
