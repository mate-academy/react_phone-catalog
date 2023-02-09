import { Link } from 'react-router-dom';
import { Product } from '../../types/types';
import { Button } from '../Button/Button';
import './NavigationButtons.scss';

type Props = {
  product?: Product,
  id?: string,
};

export const NavigationButtons:React.FC<Props> = ({ product, id }) => {
  return (
    <div className="navigation-buttons">
      <div className="sub-buttons">
        <Button
          image="/icons/Home.svg"
          alt="home"
          link="/home"
          className="no-border"
        />
      </div>
      <div className="sub-buttons">
        <img
          className="button-image"
          src="/icons/Chevron (Arrow Right).svg"
          alt=">"
        />
        <a href="/phones" className="sub-link">Phones</a>
      </div>
      {
        product && (
          <div className="sub-buttons">
            <img
              className="button-image"
              src="/icons/Chevron (Arrow Right).svg"
              alt=">"
            />
            <Link to={`/phones/${id}`} className="sub-link">{product.name}</Link>
          </div>
        )
      }
    </div>
  );
};
