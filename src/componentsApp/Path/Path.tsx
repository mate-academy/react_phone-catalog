import { Link } from 'react-router-dom';
import { Phone } from '../../types/phone';
import './Path.scss';
import { Accessorie } from '../../types/accessories';
import { Tablet } from '../../types/tablets';

import cn from 'classnames';
import { useContext } from 'react';
import { StateContext } from '../../context/ContextReducer';

interface Props {
  pathname: string;
  itemPhone: Phone | Tablet | Accessorie;
}

export const Path: React.FC<Props> = ({ pathname }) => {
  const { darkThem } = useContext(StateContext);

  const chevronPath = pathname
    .split('/')
    .map(segment => segment.replaceAll('-', ' '));

  const includesTwoLevel =
    chevronPath.includes('phones') ||
    chevronPath.includes('tablets') ||
    chevronPath.includes('accessories');

  return (
    <>
      <div className="ItemCard__path">
        <Link to="/">
          <div
            className={cn('ItemCard__path__icon-home', { dark: darkThem })}
          ></div>
        </Link>

        <div className="ItemCard__path__chevron"></div>
        {includesTwoLevel ? (
          <Link
            to={`/${chevronPath[1]}`}
            className={cn('ItemCard__path__text', { dark: darkThem })}
          >
            {chevronPath[1]}
          </Link>
        ) : (
          <div className={cn('ItemCard__path__text', { dark: darkThem })}>
            {chevronPath[1]}
          </div>
        )}

        {chevronPath[2] && (
          <>
            <div className="ItemCard__path__chevron"></div>
            <div className={cn('ItemCard__path__text', { dark: darkThem })}>
              {chevronPath[2]}
            </div>
          </>
        )}
      </div>
    </>
  );
};
