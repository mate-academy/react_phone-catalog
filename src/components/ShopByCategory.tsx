import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  return (
    <div className="shopBy">
      <div className="shopBy__container">
        <Link
          to="/phones"
          className="shopBy__container--link shopBy__container--link-phones"
        >
          <img
            alt="Phones"
            src="_new/img/category-phones.png"
            className="shopBy__container--link-image-phones"
          />
        </Link>
        <h2 className="shopBy__container--title">Mobile Phones</h2>
        <h3 className="shopBy__container--description">models</h3>
      </div>

      <div className="shopBy__container">
        <Link
          to="/tablets"
          className="shopBy__container--link shopBy__container--link-tablets"
        >
          <img
            alt="Phones"
            src="_new/img/category-tablets.png"
            className="shopBy__container--link-image-tablets "
          />
        </Link>
        <h2 className="shopBy__container--title">Tablets</h2>
        <h3 className="shopBy__container--description">models</h3>
      </div>

      <div className="shopBy__container">
        <Link
          to="/accessories"
          className="shopBy__container--link
          shopBy__container--link-accessories"
        >
          <img
            alt="Phones"
            src="_new/img/category-accessories.png"
            className="shopBy__container--link-image-accessories"
          />
        </Link>
        <h2 className="shopBy__container--title">Accessories</h2>
        <h3 className="shopBy__container--description">models</h3>
      </div>
    </div>
  );
};
