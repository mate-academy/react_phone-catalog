import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  toUpperCaseFirstLetter,
} from '../utils/helpers';

import home from '../imgs/icons/Home.svg';

import right from '../imgs/icons/Chevron (Arrow Right).svg';

export const NavigationField: React.FC = () => {
  const location = useLocation();
  const params = useParams();

  const [list, setList] = useState<string[]>([]);

  const getCorrectLink = (str: string) => {
    const result = str.split('/');

    result.forEach(item => {
      if (item.length) {
        setList(prev => {
          const words = item.split('-')
            .map(word => toUpperCaseFirstLetter(word));

          const string = words.join(' ');

          return [...prev, string];
        });
      }
    });
  };

  useEffect(() => {
    getCorrectLink(location.pathname);
  }, []);

  return (
    <div className="NavigationField">
      <Link to="/">
        <img src={home} alt="" className="NavigationField__button--home" />
      </Link>

      <ul className="NavigationField__list">
        {list.map(link => (
          <li key={link} className="NavigationField__item">
            <Link to={link.toLowerCase() === params.category ? `/${link.toLowerCase()}` : `/${params.category}/${link.split(' ').join('-').toLowerCase()}`}>
              <img src={right} alt="right" className="NavigationField__arrow" />
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
