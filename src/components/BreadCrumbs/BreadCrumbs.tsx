import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  category: string;
  productName?: string;
};

export const BreadCrumbs = ({ category, productName }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__home">
        <img
          src={
            theme === 'dark'
              ? '/img/icons/home.svg'
              : '/img/icons-light/home-light.svg'
          }
          alt="Home"
        />
      </Link>

      <img
        src="/img/icons/arrow-right.svg"
        alt="Arrow"
        className="breadcrumbs__arrow"
      />

      <Link to={`/${category}`} className="breadcrumbs__link">
        {category}
      </Link>

      {productName && (
        <>
          <img
            src="/img/icons/arrow-right.svg"
            alt="Arrow"
            className="breadcrumbs__arrow"
          />

          <span className="breadcrumbs__current">{productName}</span>
        </>
      )}
    </div>
  );
};
