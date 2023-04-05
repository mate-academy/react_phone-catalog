import { Link, useLocation } from 'react-router-dom';
import './Location.scss';

export const Location = () => {
  const location = useLocation();
  const path = location.pathname.split('/').join(' ');
  const preparetedPath = path.slice(0).split(' ').filter((el) => el !== '');

  let pathProduct;

  const PathName = preparetedPath[0][0].toUpperCase() + preparetedPath[0].slice(1);

  if (preparetedPath.length >= 2) {
    pathProduct = preparetedPath[1].split('-').map((el) => el[0].toUpperCase() + el.slice(1)).join(' ');
  }

  return (
    <section className="location">
      <div className="location__container">
        <Link to="/home" className="location__link">
          <img src="/Images/home.svg" alt="" className="location__img" />
        </Link>

        <img src="/Images/arrow-icon--lite.svg" className="location__img--arrow" alt="" />

        <Link to={location.pathname} className="location__link">
          {PathName}
        </Link>

        {pathProduct && (
          <>
            <img src="/Images/arrow-icon--lite.svg" className="location__img--arrow" alt="" />

            <Link to={`/phones/${preparetedPath[1]}`} className="location__link">
              {pathProduct}
            </Link>
          </>
        )}
      </div>

    </section>
  );
};
