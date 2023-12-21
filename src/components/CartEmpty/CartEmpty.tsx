import { useLocation } from 'react-router-dom';
import './CartEmpty.scss';

export const CartEmpty = () => {
  const { pathname } = useLocation();

  return (
    <div className="CartEmpty">
      <p className="CartEmpty__message">
        {`Your ${pathname.slice(1)} is empty...`}
      </p>
    </div>
  );
};
