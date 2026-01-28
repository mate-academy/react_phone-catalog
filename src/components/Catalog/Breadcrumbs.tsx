import { Link, useLocation } from 'react-router-dom';
import homeimage from '../../images/icons/home-image.svg';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const location = pathname.split('/').slice(1);

  return (
    <div className="catalog__bradcrumbs bradcrumbs">
      <Link to="/">
        <img src={homeimage} />
      </Link>
      {location.map((item, i) =>
        i < location.length - 1 ? (
          <Link to={`/${item}`} key={item} className="bradcrumbs__link">
            <span>&#62; {item}</span>
          </Link>
        ) : (
          <span className="bradcrumbs__link bradcrumbs__link--last" key={item}>
            &#62; {item}
          </span>
        ),
      )}
    </div>
  );
};
