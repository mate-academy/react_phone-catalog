import { useContext } from 'react';
import style from './Cards.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { IconFavorites } from '../Icons/IconFavorites';
import classNames from 'classnames';
import { ThemeContext } from '../../store/ThemeProvider';
import { Products } from '../../types/ContextType/Products';
import { Link } from 'react-router-dom';
import { StateContext } from '../../store/StateProvider';
import { availableFav } from '../../utils/availableFav';
import Heart from '../../image/Favorites/heart.svg';

type Props = {
  gadgets: Products[];
};

export const Cards: React.FC<Props> = ({ gadgets }) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);
  const { setFavorites, favorites } = useContext(StateContext);

  return (
    <div
      className={classNames(style.cards, { [style.cards__darkTheme]: theme })}
    >
      <ul className={style.cards__list} draggable={false}>
        {gadgets.map(product => (
          <li className={style.cards__container} key={product.id}>
            <Link
              to={`${product.itemId}`}
              className={style.cards__cardLink}
              draggable={false}
            >
              <img
                src={product.image}
                alt={product.name}
                className={style.cards__cardImg}
                draggable={false}
              />
            </Link>
            <div className={style.cards__cardContent}>
              <Link to={`${product.itemId}`} className={style.cards__cardName}>
                {product.name}
              </Link>
              <div className={style.cards__price}>
                <p className={style.cards__discountPrice}>
                  &#36;{product.price}
                </p>
                <p className={style.cards__fullPrice}>
                  &#36;{product.fullPrice}
                </p>
              </div>

              <span className={style.cards__cardLine} />

              <div className={style.cards__cardDescription}>
                <p className={style.cards__key}>{t('screen')}</p>
                <p className={style.cards__value}>{product.screen}</p>
              </div>
              <div className={style.cards__cardDescription}>
                <p className={style.cards__key}>{t('capacity')}</p>
                <p className={style.cards__value}>{product.capacity}</p>
              </div>
              <div className={style.cards__cardDescription}>
                <p className={style.cards__key}>{t('ram')}</p>
                <p className={style.cards__value}>{product.ram}</p>
              </div>
            </div>

            <div className={style.cards__cardActions}>
              <button className={style.cards__addToCard}>
                {t('addToCart')}
              </button>
              <button
                className={classNames(style.cards__сardFavBtn, {[style.cards__selectedFavorite]: availableFav(product, favorites)})}
                onClick={() =>
                  setFavorites(prevProducts => {
                    const newFavorites = [...prevProducts];
                    const availableFav = newFavorites.some(
                      item => item.itemId === product.itemId,
                    );

                    if (availableFav) {
                      return newFavorites.filter(
                        item => item.itemId !== product.itemId,
                      );
                    } else {
                      return [...newFavorites, product];
                    }
                  })
                }
              >
                {availableFav(product, favorites) ? (
                  <img src={Heart} alt="LikeLogo" />
                ) : (
                  <IconFavorites />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
