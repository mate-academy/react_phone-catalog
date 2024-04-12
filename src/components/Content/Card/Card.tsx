import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import classNames from 'classnames';
import {ProductContext} from '../../../context/ProductContext';
import {Products} from '../../../type/Productes';

import styles from './Card.module.scss';

type Props = {
  produkt: Products;
};

export const Card: React.FC<Props> = ({produkt}) => {
  const {priceList, setSelectIdCart, favourites, setProductExists} =
    useContext(ProductContext);

  const hasElementFavorit = () => {
    return favourites?.some(item => item?.id === produkt?.id) ?? false;
  };

  const hasElementCart = () => {
    return priceList?.some(item => +item?.id === +produkt?.id) ?? false;
  };

  const handleSelectIdFavorit = (id: number) => {
    if (hasElementFavorit()) {
      return setProductExists({hasProdPriceList: true, id});
    }

    return setProductExists({hasProdPriceList: false, id});
  };

  const handleClickCart = (productId: string | number) => {
    if (hasElementCart()) {
      return setSelectIdCart({hasProdPriceList: true, id: productId});
    }

    return setSelectIdCart({hasProdPriceList: false, id: productId});
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
            onClick={() => handleClickCart(produkt.id)}
            className={classNames(styles.card__button, {
              [styles.card__button_active]: hasElementCart(),
            })}
          >
            {!hasElementCart() ? 'Add to cart' : 'Added'}
          </button>
          <button
            type="button"
            className={styles.card__favorit}
            onClick={() => handleSelectIdFavorit(+produkt.id)}
          >
            {(!hasElementFavorit() && <FaRegHeart />) || (
              <FaHeart style={{color: 'red'}} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
