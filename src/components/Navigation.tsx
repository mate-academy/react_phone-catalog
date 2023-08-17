import { Link, useLocation, useParams } from 'react-router-dom';

export const Navigation = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const getCategory = (path: string) => path.split('/')[1];
  const category = getCategory(pathname);

  const toUpperCaseFirstLetter = (word: string) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
  };

  const getCorrectIdName = (str: string) => {
    const result = str.split('-').map(word => toUpperCaseFirstLetter(word));

    return result.join(' ');
  };

  return (
    <div className="navigation">
      <Link to="/">
        <div className="icon icon--home" />
      </Link>

      {category && (
        <ul className="navigation__list text__small">
          <li className="navigation__item">
            <div className="icon icon--nav" />
          </li>
          <li className="navigation__item">
            <Link to={`/${category}`}>
              {toUpperCaseFirstLetter(category)}
            </Link>
          </li>

          {id && (
            <>
              <li className="navigation__item">
                <div className="icon icon--nav" />
              </li>

              <li className="navigation__item">
                <Link to={`/${category}/${id}`}>
                  {getCorrectIdName(id)}
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
