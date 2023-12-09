import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './Container.scss';

export const Container: React.FC = memo(({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className={classNames('container', {
      'container--extend': pathname === '/' || pathname.includes('cart'),
    })}
    >
      {children}
    </div>
  );
});
