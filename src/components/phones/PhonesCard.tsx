import './phone.scss';
import { Phone } from '../../types/phone';

type Props = {
  phones: Phone[]
  showOldPrice: boolean
};

export const PhonesCard: React.FC<Props> = ({
  phones,
  showOldPrice,
}) => {
  return (
    <div className="card-container">
      <div className="card" data-qa="card">
        {phones.map(phone => (
          <div key={phone.id} className="card__info">
            <img
              className="card__image"
              src={phone.image}
              alt="xs"
            />
            <a href="/phone/" className="card__description">
              {phone.name}
            </a>
            <div className="card__price">
              <article className="card__new-price">{`$${phone.price}`}</article>
              {showOldPrice && (
                <article className="card__old-price">{`$${phone.fullPrice}`}</article>
              )}
            </div>

            <div className="card__line" aria-label="line" />
            <div className="card__screen">
              <article className="card__screen-name">Screen</article>
              <article className="card__screen-value">{phone.screen}</article>
            </div>
            <div className="card__copacity">
              <article className="card__copacity-name">Copcity</article>
              <article
                className="card__copacity-value"
              >
                {phone.capacity}
              </article>
            </div>
            <div className="card__ram">
              <article className="card__ram-name">RAM</article>
              <article className="card__ram-value">{phone.ram}</article>
            </div>
            <div className="card__buttons">
              <a className="card__buttons-add" href="/">Add to cart</a>
              <a
                className="card__buttons-heart"
                href="/"
              >
                <img src="./img/icons/Heart.svg" alt="heart" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhonesCard;
