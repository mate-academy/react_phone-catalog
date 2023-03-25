import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { BadgePlus } from '../BadgePlus/BadgePlus';

import './Category.scss';

type Props = {
  name: string;
  srcImage: string;
  count: number;
};

export const Category: FC<Props> = ({ name, srcImage, count }) => {
  return (
    <div className="category">
      <NavLink
        to="phones"
        className="category__link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <BadgePlus />
      </NavLink>
      <div className={classNames(
        'category__container-image',
        { 'category__container-image--phones': name === 'Mobile phones' },
        { 'category__container-image--tablets': name === 'Tablets' },
        { 'category__container-image--accessories': name === 'Accessories' },
      )}
      >
        <img
          src={srcImage}
          alt={name}
          className="category__image"
        />
      </div>

      <h2 className="category__title">{name}</h2>
      <p className="category__count">
        {`${count} models`}
      </p>
    </div>
  );
};
