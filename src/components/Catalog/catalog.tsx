import './catalog.scss';
import { Phone } from '../../Types/type';

interface CatalogProps {
  phonesOnPage: Phone[];
}

export const Catalog = ({ phonesOnPage }: CatalogProps) => {
  return (
    <div className="catalog">
      {phonesOnPage.map((phone: Phone) => (
        <article className="catalog__product" key={phone.id}>
          <img
            className="catalog__product__image"
            src={phone.images[0]}
            alt={phone.id}
          />
          <p className="catalog__product__name">{phone.name}</p>
          <h4 className="catalog__product__price">${phone.priceRegular}</h4>
          <hr className="catalog__product--line" />

          <div className="catalog__product__description">
            <p className="catalog__product__description__screen">Screen</p>
            <p className="catalog__product__description__screen--number">
              {phone.screen}
            </p>
          </div>
          <div className="catalog__product__description">
            <p className="catalog__product__description__capacity">Capacity</p>
            <p className="catalog__product__description__capacity--number">
              {phone.capacity}
            </p>
          </div>
          <div className="catalog__product__description">
            <p className="catalog__product__description__ram">RAM</p>
            <p className="catalog__product__description__ram--number">
              {phone.ram}
            </p>
          </div>

          <div className="catalog__product__buttons">
            <button className="catalog__product__buttons__button__add">
              Add to cart
            </button>
            <button className="catalog__product__buttons__button__favourites">
              <span className="catalog__product__buttons__button__favourites--heart"></span>
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};
