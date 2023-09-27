import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './container.scss';

export const Container: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className={classNames('container', {
      'container--extend': pathname === '/' || pathname.includes('cart'),
    })}
    >
      {children}
    </div>
  );
};
