import { Link, useLocation } from 'react-router-dom';

export const PageNavigation = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').slice(1);
  const index = location.pathname.lastIndexOf('/');
  const prevPath = location.pathname.slice(0, index);

  return (
    <nav className="page__navigation">
      <div className="page__navigation--path" data-cy="breadCrumbs">
        <Link to="/" className="page__navigation--icon">
          <img src="assests/images/Home.svg" alt="icon-home" />
        </Link>

        {pathNames.map((item, i) => (

          <>
            <div
              className="page__navigation--arrow-left"
              key={item + item[i + 1]}
            >
              <img
                src="assests/images/Arrow-right-gray.svg"
                alt="icon-rigth"
              />
            </div>
            {item === pathNames[pathNames.length - 1]
              ? <span key={item}>{item[0].toUpperCase() + item.slice(1)}</span>
              : (
                <Link
                  to={`/${pathNames.slice(0, pathNames.indexOf(item) + 1).join('/')}`}
                >
                  {item[0].toUpperCase() + item.slice(1)}
                </Link>
              )}
          </>
        ))}
      </div>
      <Link to={prevPath || '/'} className="page__navigation--go-back">
        <img src="assests/images/Arrow-left.svg" alt="icon-left" />
        <span data-cy="backButton">Back</span>
      </Link>
    </nav>
  );
};
