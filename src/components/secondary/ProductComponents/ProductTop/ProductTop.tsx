import { Phone } from '../../../../types/Phone';
import { Link } from 'react-router-dom';
import './ProductTop.scss';

interface Props {
  phone: Phone | null;
}

export const ProductTop: React.FC<Props> = ({ phone }) => {
  if (phone === null) {
    return null;
  }

  return (
    <section className="product-top">
      <div className="product-top__content">
        <nav>
          <ul className="product-top__breadcrumb">
            <li>
              <Link className="product-top__breadcrumb-icon" to="/">
                <img
                  src="../../../../public/icons/icon-house.svg"
                  alt="Icon House"
                />
              </Link>
            </li>

            <div className="product-top__breadcrumb-arrow-right"></div>

            <p className="product-top__breadcrumb-path-0">Phones</p>

            <div className="product-top__breadcrumb-arrow-right"></div>

            <p className="product-top__breadcrumb-path-1">{phone.name}</p>
          </ul>
        </nav>

        <div className="product-top__back">
          <div className="product-top__back-arrow-left"></div>

          <Link to="/phones">
            <button className="product-top__back-button">Back</button>
          </Link>
        </div>

        <h1 className="product-top__h1">{phone.name}</h1>
      </div>
    </section>
  );
};
