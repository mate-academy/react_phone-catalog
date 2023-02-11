import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { Product } from '../../types/types';
import { Button } from '../Button/Button';
import './NavigationButtons.scss';

type Props = {
  id?: string,
};

export const NavigationButtons:React.FC<Props> = ({ id }) => {
  const { detailedProduct } = useContext<any>(DetailedProductContext);
  const { pathname } = useLocation();

  console.log(detailedProduct)

  return (
    <div className="navigation-buttons">
      <NavLink to="/">
        {/* <div className="sub-buttons"> */}
        <Button
          image="/icons/Home.svg"
          alt="home"
          link="/home"
          className="no-border"
        />
        {/* </div> */}
      </NavLink>
      <div className="sub-buttons body12">
        <img
          className="button-image"
          src="/icons/Chevron (Arrow Right).svg"
          alt=">"
        />
        <a href="/phones" className="sub-link">Phones</a>
      </div>
      {
        detailedProduct && pathname.includes(id) && (
          <div className="sub-buttons body12">
            <img
              className="button-image"
              src="/icons/Chevron (Arrow Right).svg"
              alt=">"
            />
            <Link to={`/phones/${id}`} className="sub-link">{detailedProduct.name}</Link>
          </div>
        )
      }
    </div>
  );
};
