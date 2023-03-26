import { Link, useLocation, useParams } from 'react-router-dom';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './way.scss';

export const Way:React.FC = () => {
  const location = useLocation();
  const { id = '' } = useParams();

  const renderString = () => {
    const str = location.pathname.replace('/', '').replace(`/${id}`, '');

    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <div className="wrapper-way">
      { renderString() !== 'Shopping' ? (
        <>
          <NavLinkCustom way="/" classStyle="home-link">
            <img src="./img/icons/Home.png" alt="home" />
          </NavLinkCustom>
          <img src="./img/icons/Right.png" alt="right" />
        </>
      ) : <></>}
      <Link
        to={location.pathname === '/shopping'
          ? '/'
          : location.pathname.replace(`/${id}`, '')}
        className="page"
      >
        { renderString() === 'Shopping'
        && <img src="./img/icons/Left.png" alt="left" />}
        {renderString() === 'Shopping' ? 'Back' : renderString()}
      </Link>
      {id && (
        <div className="wrapper-productName">
          <img src="./img/icons/Right.png" alt="right" />
          <span>{id}</span>
        </div>
      )}
    </div>
  );
};
