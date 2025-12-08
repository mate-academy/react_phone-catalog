import { Link } from 'react-router-dom';
import { Phone } from '../../../Types/type';
import style from './Favourite.module.scss';

interface FavouritesPageProps {
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favourites: Phone[];
}

export const Favourite = ({
  toggleFavourite,
  toggleInCart,
  favourites,
}: FavouritesPageProps) => {
  return (
    <div className={style.catalog}>
      {favourites.map((phone: Phone) => {
        return (
          <article className={style.favourite__product} key={phone.id}>
            <Link to={phone.id} className={style.favourite__product__link}>
              <img
                className={style.favourite__product__link__image}
                src={phone.images[0]}
                alt={phone.id}
              />
              <p className={style.favourite__product__name}>{phone.name}</p>
            </Link>
            <h4 className={style.favourite__product__price}>
              ${phone.priceRegular}
            </h4>
            <hr className={style[`favourite__product--line`]} />

            <div className={style.favourite__product__description}>
              <p className={style.favourite__product__description__screen}>
                Screen
              </p>
              <p
                className={
                  style[`favourite__product__description__screen--number`]
                }
              >
                {phone.screen}
              </p>
            </div>
            <div className={style.favourite__product__description}>
              <p className={style.favourite__product__description__capacity}>
                Capacity
              </p>
              <p
                className={
                  style[`favourite__product__description__capacity--number`]
                }
              >
                {phone.capacity}
              </p>
            </div>
            <div className={style.favourite__product__description}>
              <p className={style.favourite__product__description__ram}>RAM</p>
              <p
                className={
                  style[`favourite__product__description__ram--number`]
                }
              >
                {phone.ram}
              </p>
            </div>

            <div className={style.favourite__product__buttons}>
              <button
                className={style.favourite__product__buttons__button__add}
                onClick={() => toggleFavourite(phone)}
              >
                Add to cart
              </button>
              <button
                className={
                  style.favourite__product__buttons__button__favourites
                }
              >
                <span
                  className={`
                ${style[`favourite__product__buttons__button__favourites--heart`]}
                `}
                ></span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
