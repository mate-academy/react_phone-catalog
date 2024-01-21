import Arrow from '../img/Slider button right.png';
// import heeart from '../img/favourites.svg'
/* eslint-disable max-len */

interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

type Props = {
  getPhone: Phones[] | undefined
};

export const HotPrices: React.FC<Props> = ({ getPhone }) => {
  return (
    <section className="hot-prices__wrapper">
      <div className="hot-prices__content">
        <div className="hot-prices__header">
          <h3 className="hot-prices__header__title">Hot prices</h3>
          <div className="hot-prices__header__buttons">
            <button
              type="button"
              className="hot-prices__header__buttons__button"
            >
              <img
                className="hot-prices__header__buttons__button__img--left"
                src={Arrow}
                alt="arrow left"
              />
            </button>
            <button
              type="button"
              className="hot-prices__header__buttons__button"
            >
              <img
                className="hot-prices__header__buttons__button__img--right"
                src={Arrow}
                alt="arrow right"
              />
            </button>
          </div>
        </div>
        <div className="hot-prices__goods">
          <div className="hot-prices__goods__cards">
            {!!getPhone && getPhone.map((phone, index) => (index < 4 && (
              <div className="hot-prices__goods__cards__good-card">
                <img
                  src={`../_new/${phone.image}`}
                  alt=""
                  className="hot-prices__goods__cards__good-card__img"
                />
                <div className="hot-prices__goods__cards__good-card__header">
                  <h4 className="hot-prices__goods__cards__good-card__header__name">
                    {phone.name}
                  </h4>
                  <div className="hot-prices__goods__cards__good-card__header__prace">
                    <p className="hot-prices__goods__cards__good-card__header__prace__new">
                      {`$${phone.price}`}
                    </p>
                    <p className="hot-prices__goods__cards__good-card__header__prace__old">
                      {phone.fullPrice}
                    </p>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__header__line" />
                  <div className="hot-prices__goods__cards__good-card__main">
                    <div className="hot-prices__goods__cards__good-card__main__titles">
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Screen
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        Capacity
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__titles__title">
                        RAM
                      </h5>
                    </div>
                    <div className="hot-prices__goods__cards__good-card__main__info">
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.screen}
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.capacity}
                      </h5>
                      <h5 className="hot-prices__goods__cards__good-card__main__info__title">
                        {phone.ram}
                        {' '}
                      </h5>
                    </div>
                  </div>
                  <div className="hot-prices__goods__cards__good-card__buttons">
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__cart"
                      tabIndex={0}
                      aria-label="Previous Image"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="hot-prices__goods__cards__good-card__buttons__favorite"
                      tabIndex={0}
                      aria-label="Previous Image"
                    />
                  </div>
                </div>
              </div>
            )
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
