import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import './continer.scss';

type Props = {
  children: JSX.Element,
};

export const Container: React.FC<Props> = ({ children }) => {
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
