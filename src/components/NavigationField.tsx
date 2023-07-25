import { Link, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import {
  toUpperCaseFirstLetter,
} from '../utils/helpers';

import home from '../imgs/icons/Home.svg';

import right from '../imgs/icons/Chevron (Arrow Right).svg';

export const NavigationField: React.FC = () => {
  const { category, id } = useParams();

  const { t } = useTranslation();

  const getCorrectIdName = (str: string) => {
    const result = str.split('-').map(word => toUpperCaseFirstLetter(word));

    return result.join(' ');
  };

  return (
    <div className="NavigationField">
      <Link to="/">
        <img src={home} alt="" className="NavigationField__button--home" />
      </Link>

      <ul className="NavigationField__list">
        <li className="NavigationField__item">
          <Link to={`/${category}`}>
            <img src={right} alt="right" className="NavigationField__arrow" />
            {t(`${category}`)}
          </Link>
        </li>

        <li>
          {id && (
            <Link to={`/categories/${category}/${id}`}>
              <img src={right} alt="right" className="NavigationField__arrow" />
              {getCorrectIdName(id)}
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
