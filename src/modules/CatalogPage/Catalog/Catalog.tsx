import style from './Catalog.module.scss';
import { Phone } from '../../../Types/type';
import { Link, useLocation } from 'react-router-dom';

interface CatalogProps {
  itemsOnPage: Phone[];
  toggleFavourite: (product: Phone) => void;
  toggleInCart: (product: Phone) => void;
  favouriteButton: Set<string>;
}

export const Catalog = ({
  itemsOnPage,
  toggleInCart,
  toggleFavourite,
  favouriteButton,
}: CatalogProps) => {
  const location = useLocation();

  let currentPage = '';

  if (location.pathname === '/phones') {
    currentPage = 'phones';
  } else if (location.pathname === '/tablets') {
    currentPage = 'tablets';
  } else if (location.pathname === '/accessories') {
    currentPage = 'accessories';
  }

  return (
    <div className={style.catalog}>
      {itemsOnPage.map((phone: Phone) => {
        const isFavourite = favouriteButton.has(phone.id);
        return (
          <article className={style.catalog__product} key={phone.id}>
            <Link
              to={`/${currentPage}/${phone.id}`}
              className={style.catalog__product__link}
            >
              <img
                className={style.catalog__product__link__image}
                src={phone.images[0]}
                alt={phone.id}
              />
              <p className={style.catalog__product__name}>{phone.name}</p>
            </Link>
            <h4 className={style.catalog__product__price}>
              ${phone.priceRegular}
            </h4>
            <hr className={style[`catalog__product--line`]} />

            <div className={style.catalog__product__description}>
              <p className={style.catalog__product__description__screen}>
                Screen
              </p>
              <p
                className={
                  style[`catalog__product__description__screen--number`]
                }
              >
                {phone.screen}
              </p>
            </div>
            <div className={style.catalog__product__description}>
              <p className={style.catalog__product__description__capacity}>
                Capacity
              </p>
              <p
                className={
                  style[`catalog__product__description__capacity--number`]
                }
              >
                {phone.capacity}
              </p>
            </div>
            <div className={style.catalog__product__description}>
              <p className={style.catalog__product__description__ram}>RAM</p>
              <p
                className={style[`catalog__product__description__ram--number`]}
              >
                {phone.ram}
              </p>
            </div>

            <div className={style.catalog__product__buttons}>
              <button
                className={style.catalog__product__buttons__button__add}
                onClick={() => toggleInCart(phone)}
              >
                Add to cart
              </button>
              <button
                className={style.catalog__product__buttons__button__favourites}
                onClick={() => toggleFavourite(phone)}
              >
                <span
                  className={`
                ${style[`catalog__product__buttons__button__favourites--heart`]}
                ${isFavourite ? style['catalog__product__buttons__button__favourites--heart--active'] : ''}
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
