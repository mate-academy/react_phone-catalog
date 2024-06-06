import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { IconHome, IconRight } from '../IconsSVG';

type Props = {
  category: string;
  name?: string;
};

export const Route: React.FC<Props> = React.memo(({ category, name }) => {
  return (
    <div className="route">
      <Link to="/">
        <IconHome />
      </Link>

      <IconRight />

      <Link to={name ? '..' : '.'} className="route__category">
        <span
          className={cn({ black: name })}
          style={name ? {} : { cursor: 'default' }}
        >
          {category}
        </span>
      </Link>

      {name && <IconRight />}

      {name && <span className="route__device">{name}</span>}
    </div>
  );
});
