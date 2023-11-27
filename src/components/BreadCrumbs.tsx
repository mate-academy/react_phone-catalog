import { Link, useLocation } from 'react-router-dom';

export const BreadCrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').slice(1);
  const index = location.pathname.lastIndexOf('/');
  const prevPath = location.pathname.slice(0, index);

  return (
    <nav className="bread-crumbs">
      <div className="bread-crumbs--path" data-cy="BreadCrumbs">
        <Link to="/" className="bread-crumbs--icon">
          <img src="assests/images/Home.svg" alt="icon-home" />
        </Link>

        {pathNames.map((item, i) => (

          <>
            <span
              className="bread-crumbs--arrow-left"
              key={item + item[i + 1]}
            >
              <img
                src="assests/images/Arrow-right-gray.svg"
                alt="icon-rigth"
              />
            </span>
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
      <Link to={prevPath || '/'} className="bread-crumbs--go-back">
        <img src="assests/images/Arrow-left.svg" alt="icon-left" />
        <span data-cy="backButton">Back</span>
      </Link>
    </nav>
  );
};
