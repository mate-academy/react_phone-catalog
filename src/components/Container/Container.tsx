import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './Container.scss';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div
      className={classNames('container', {
        'container--extend': pathname === '/' || pathname.includes('cart'),
      })}
    >
      {children}
    </div>
  );
};
