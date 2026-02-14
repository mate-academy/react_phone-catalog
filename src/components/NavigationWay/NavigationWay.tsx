import { Link } from 'react-router-dom';
import home from '../../images/icons/home.svg';
import arrowRight from '../../images/icons/arrow-right-disabled.svg';

import './NavigtaionWay.scss';

interface NavigationWayProps {
  category: string;
  productName?: string;
}

export const NavigationWay: React.FC<NavigationWayProps> = ({
  category,
  productName,
}) => {
  const categoryCapitalized =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="nav-way">
      <Link to="/" className="nav-way__home-link">
        <img src={home} alt="Back to home page" />
      </Link>

      <img src={arrowRight} alt="Next" className="nav-way__arrow" />

      <Link to={`/${category}`} className="nav-way__category-link">
        <span className="nav-way__category">{categoryCapitalized}</span>
      </Link>

      {productName && (
        <>
          <img src={arrowRight} alt="Next" className="nav-way__arrow" />
          <span className="nav-way__product">{productName}</span>
        </>
      )}
    </div>
  );
};
