import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.scss';
import { useAppSelector } from '../../app/hooks';

export const Breadcrumb = () => {
  const { phone } = useAppSelector(state => state.phones);
  const { pathname } = useLocation();

  const correctPath = pathname.slice(1);
  const normalizedPathname = correctPath[0].toUpperCase()
    + correctPath.slice(1);

  return (
    <div className="breadcrumb">
      <Link to="/">
        <div className="icon icon-home" />
      </Link>

      <div>
        <div className="icon icon-next-inactive" />
      </div>
      {phone ? (
        <>
          <Link to={pathname} className="breadcrumb__name--active">
            {normalizedPathname}
          </Link>

          <div>
            <div className="icon icon-next-inactive" />

            <p>{phone.name}</p>
          </div>
        </>
      ) : (
        <p className="breadcrumb__name--inactive">
          {normalizedPathname}
        </p>
      )}
    </div>
  );
};
