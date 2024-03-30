import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ProductContext } from '../../../context/ProductContext';
import { Products } from '../../../type/Productes';

import { hasProdPriceList } from '../../../utils';

import styles from './Card.module.scss';

type Props = {
  produkt: Products;
};

export const Card: React.FC<Props> = ({ produkt }) => {
  const { priceList, setSelectIdCart, favourites, setSelectIdFavorit } =
    useContext(ProductContext);

  const hasElement = () => {
    return favourites.find(item => item.id === produkt.id) !== undefined;
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__container}>
        <Link to={`../${produkt.category}/:${produkt.itemId}`}>
          <div className={styles.card__img}>
            <img src={produkt.image} alt="" />
          </div>
          <h3 className={styles.card__title}>{produkt.name}</h3>
          <div className={styles.card__prices}>
            <p className={styles.card__discount}>${produkt.price}</p>
            {produkt.fullPrice !== produkt.price && (
              <p className={styles.card__price}>${produkt.fullPrice}</p>
            )}
          </div>
          <div className={styles.card__properties}>
            <div className={styles.card__item}>
              <div className={styles.card__properties_name}>Screen</div>{' '}
              <div className={styles.card__properties_value}>
                {produkt.screen}
              </div>
            </div>
            <div className={styles.card__item}>
              <div className={styles.card__properties_name}>Capacity</div>
              <div className={styles.card__properties_value}>
                {produkt.capacity}
              </div>
            </div>
            <div className={styles.card__item}>
              <div className={styles.card__properties_name}>RAM</div>
              <div className={styles.card__properties_value}>{produkt.ram}</div>
            </div>
          </div>
        </Link>

        <div className={styles.card__control}>
          <button
            type="button"
            onClick={() => setSelectIdCart(+produkt.id)}
            className={styles.card__button}
          >
            {!hasProdPriceList(+produkt.id, priceList)
              ? 'Add to cart'
              : 'Added'}
          </button>
          <button
            type="button"
            className={styles.card__favorit}
            onClick={() => setSelectIdFavorit(+produkt.id)}
          >
            {(!hasElement() && <FaRegHeart />) || (
              <FaHeart style={{ color: 'red' }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
