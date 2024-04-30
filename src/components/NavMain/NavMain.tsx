import React from 'react';
import HomeIcon from '../../pages/PhonePage/components/HomeIcon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight } from '../Buttons/Button';

type Props = {
  category: string;
};

const NavMain: React.FC<Props> = ({ category }) => {
  const { productId } = useParams();

  const navigate = useNavigate();

  return (
    <div className="nav__main">
      <Link to="/" className="nav__main-link" onClick={() => navigate('/')}>
        <HomeIcon />
      </Link>

      <ArrowRight />

      <Link to={`/${category.toLowerCase()}`}>
        <span className="nav__main-slug nav__main-slug-first">{`${category}`}</span>
      </Link>

      {productId && (
        <>
          <ArrowRight />

          <span className="nav__main-slug nav__main-slug-second">{`${productId.split('-').join(' ')}`}</span>
        </>
      )}
    </div>
  );
};

export default NavMain;
