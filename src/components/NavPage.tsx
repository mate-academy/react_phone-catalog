import { Link } from 'react-router-dom';
import './NavPage.scss';

interface NavPageProps {
  page: string;
  products?: string;
}

const NavPage = ({ page, products }: NavPageProps) => {
  return (
    <>
      <nav className="navpage">
        <Link to="/">
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/img/home.svg`}
            alt="icon home svg"
          />
        </Link>
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-right-light.svg`}
          alt="icon chevron svg"
        />
        {products ? (
          <Link to={`/${page}`} className="navpage__subtitle">
            {page}
          </Link>
        ) : (
          <p className="navpage__title">{page}</p>
        )}
        {products && (
          <>
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-right-light.svg`}
              alt="icon chevron svg"
            />
            <p className="navpage__title">{products}</p>
          </>
        )}
      </nav>
      {products && (
        <Link to={`/${page}`} className="navpage__back">
          <img
            src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-left.svg`}
            alt="icon chevron svg"
          />
          <p>Back</p>
        </Link>
      )}
    </>
  );
};

export default NavPage;
