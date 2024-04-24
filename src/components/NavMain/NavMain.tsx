import React from 'react';
import HomeIcon from '../../pages/PhonePage/components/HomeIcon';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from '../Buttons/Button';

const NavMain: React.FC = () => {
  const { phonesSlug } = useParams();

  return (
    <div className="nav__main">
      <Link to="/" className="nav__main-link">
        <HomeIcon />
      </Link>

      <ArrowRight />

      <span className="nav__main-slug">{`${phonesSlug}`}</span>
    </div>
  );
};

export default NavMain;
