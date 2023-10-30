import { Link } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import './HeaderDetails.scss';

type Props = {
  productDescription: ProductInfo;
  productCategory: string;
};

export const HeaderDetails: React.FC<Props> = (
  {
    productCategory,
    productDescription,
  },
) => {
  return (
    <div className="Header">
      <div className="Header__route">
        <Link to="/" className="Header__link">
          <img
            className="Header__svg"
            src="./assets/Home.svg"
            alt="home-icon"
          />
        </Link>
        <img
          className="Header__svg"
          src="./assets/Chevron-arrow-right.svg"
          alt="arrow-right"
        />
        <Link to={`/${productCategory}`} className="Header__link">
          <h3 className="Header__routeText">
            {productCategory}
          </h3>
        </Link>
        <img
          className="Header__svg"
          src="./assets/Chevron-arrow-right.svg"
          alt="arrow-right"
        />
        <h3 className="Header__routeText">
          {productDescription.name}
        </h3>
      </div>
      <div className="Header__back">
        <Link to="/phones" className="Header__link">
          <img
            className="Header__svg"
            src="./assets/Chevron-arrow-left.svg"
            alt="arrow-left"
          />
          <h3 className="Header__routeText">
            Back
          </h3>
        </Link>
      </div>
      <h1 className="Header__title">
        {productDescription.name}
      </h1>
    </div>
  );
};
