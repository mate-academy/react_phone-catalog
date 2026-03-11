import React from 'react';
import { Link } from 'react-router-dom';
import './colorLink.scss';
import classNames from 'classnames';

interface Props {
  color: string;
  to: string;
  selected?: boolean;
  onClick?: () => void;
}

export const ColorLink: React.FC<Props> = (props) => {
  const { color, to: link, selected = false } = props;

  return (
    <Link
      to={link}
      className={classNames('color-link', { 'color-link--active': selected })}
    >
      <span
        className={classNames('color-link__circle', {
          'color-link--green': color === 'green',
          'color-link--black': color === 'black',
          'color-link--purple': color === 'purple',
          'color-link--red': color === 'red',
          'color-link--white': color === 'white',
          'color-link--yellow': color === 'yellow',
          'color-link--gold': color === 'gold',
          'color-link--midnightgreen': color === 'midnightgreen',
          'color-link--silver': color === 'silver',
          'color-link--spacegray': color === 'spacegray',
          'color-link--rosegold': color === 'rosegold',
          'color-link--coral': color === 'coral',
          'color-link--spaceblack': color === 'spaceblack',
          'color-link--midnight': color === 'midnight',
          'color-link--pink': color === 'pink',
          'color-link--blue': color === 'blue',
          'color-link--sierrablue': color === 'sierrablue',
          'color-link--graphite': color === 'graphite',
        })}
      />
    </Link>
  );
};
