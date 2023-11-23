import { Link, useParams } from 'react-router-dom';
import home from '../images/icons/Home.svg';
import right from '../images/icons/Chevron (Arrow Right).svg';
import { toUpperCaseFirstLetter } from '../helpers/helpers';

export const NavigationField: React.FC = () => {
  const { category, id } = useParams();

  const getCorrectIdName = (str: string) => {
    const result = str.split('-').map(word => toUpperCaseFirstLetter(word));

    return result.join(' ');
  };

  return (
    <div className="NavigationField">
      <Link to="/">
        <img src={home} alt="home" className="NavigationField__button--home" />
      </Link>

      <Link to={`/${category}`}>
        <img
          src={right}
          alt="right"
          className="NavigationField__button--arrow"
        />
        {toUpperCaseFirstLetter(`${category}`)}
      </Link>

      {id && (
        <Link to={`/category/${category}/${id}`} style={{ pointerEvents: 'none' }}>
          <img
            src={right}
            alt="right"
            className="NavigationField__button--arrow"
          />
          {getCorrectIdName(id)}
        </Link>
      )}
    </div>
  );
};
