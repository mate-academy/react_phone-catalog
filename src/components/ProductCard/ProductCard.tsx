import hearIcon from '../../assets/navbar/heart.svg';
import phone from '../../assets/00.jpg';

import './ProductCard.scss';

export const ProductCard = () => (
  <div className="product-card">
    <img className="product-card__image" src={phone} alt="phone" />

    <p className="product-card__name">Namedsadasdasdasdasdsadasdasd</p>
    <p className="product-card__price">
      $799
      <span className="product-card__price--strike">$899</span>
    </p>

    <table>
      <tbody className="product-card__specification-table">
        <tr className="product-card__table-row">
          <td className="product-card__details">Screen</td>
          <td>5.8 OLED</td>
        </tr>
        <tr className="product-card__table-row">
          <td className="product-card__details">Capacity</td>
          <td>5.8 OLED</td>
        </tr>
        <tr className="product-card__table-row">
          <td className="product-card__details">RAM</td>
          <td>5.8 OLED</td>
        </tr>
      </tbody>
    </table>

    <div className="product-card__controls">
      <button className="product-card__button" type="button">
        Add to card
      </button>

      <button
        type="button"
        className="
            product-card__button-icon product-card__button-icon--selected
            "
      >
        <img className="icon" src={hearIcon} alt="Add to favorites icon" />
      </button>
    </div>
  </div>
);
