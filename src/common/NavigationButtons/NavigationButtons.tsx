import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { DetailedProductContext } from '../../context/DetailedProductContext';
import { Button } from '../Button/Button';
import './NavigationButtons.scss';

type Props = {
  id?: string,
  title?: string,
};

export const NavigationButtons:React.FC<Props> = ({ id = '0', title }) => {
  const { detailedProduct } = useContext(DetailedProductContext) ?? {};
  const { pathname } = useLocation();

  return (
    <div className="navigation-buttons">
      <NavLink to="/">
        <Button
          image="icons/Home.svg"
          alt="home"
          className="no-border"
        />
      </NavLink>
      <div className="sub-buttons body12">
        <img
          className="button-image"
          src="icons/Chevron (Arrow Right).svg"
          alt="arrow-right"
        />
        <a href={`#/${title}`} className="sub-link">{title}</a>
      </div>
      {
        detailedProduct && pathname.includes(id) && (
          <div className="sub-buttons body12">
            <img
              className="button-image"
              src="icons/Chevron (Arrow Right).svg"
              alt="arrow-right"
            />
            <Link to={`/phones/${id}`} className="sub-link">{detailedProduct.name}</Link>
          </div>
        )
      }
    </div>
  );
};
