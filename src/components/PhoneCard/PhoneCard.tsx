/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import './PhoneCard.scss';

type Props = {
  info?: string
};

export const PhoneCard: React.FC<Props> = () => {
  return (
    <div className="phone-card">
      <img
        src="/img/products/iphone.jpg"
        alt="iphone"
        className="phone-card__photo"
      />
      <Link
        to="/"
        className="phone-card__title"
      >
        Apple iPhone Xs 64GB Silver (iMT9G2FS/A)
      </Link>
      <div className="phone-card__price">
        <p className="phone-card__actual-price">$799</p>
        <p className="phone-card__old-price">$899</p>
      </div>
      {/* <hr className='phone-card__'/> */}
      <table className="phone-card__details phone-details">
        <tbody className="phone-details__body">
          <tr className="phone-details__row">
            <td
              className="phone-details__name"
            >
              Screen
            </td>
            <td
              className="phone-details__description"
            >
              5.8” OLED
            </td>
          </tr>
          <tr className="phone-details__row">
            <td
              className="phone-details__name"
            >
              Capacity
            </td>
            <td
              className="phone-details__description"
            >
              64 GB
            </td>
          </tr>
          <tr className="phone-details__row">
            <td
              className="phone-details__name"
            >
              RAM
            </td>
            <td
              className="phone-details__description"
            >
              4 GB
            </td>
          </tr>
        </tbody>
      </table>
      <div className="phone-card__buttons card-buttons">
        <button
          type="button"
          className="card-buttons__add"
        >
          Add to card
        </button>
        <button
          type="button"
          className="card-buttons__like"
        />
      </div>
    </div>
  );
};
