import React, { useEffect, useState } from 'react';
import './ButtonHeader.scss';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Icon } from '../../../Icon';
import { Icons } from '../../../Icon/IconsMap';

type Props = {
  className: string;
  onClick: () => void;
  name: Icons;
  kind: 'favourites' | 'cart';
  showGuantity: boolean;
};

export const ButtonHeader: React.FC<Props> = ({
  className,
  onClick,
  name,
  kind,
  showGuantity,
}) => {
  const { cartItems, favoritesItems } = useGlobalContext();
  const [count, setCount] = useState(0);
  const location = useLocation();
  const category = location.pathname.slice(1);

  useEffect(() => {
    switch (kind) {
      case 'cart':
        setCount(cartItems.length);
        break;

      case 'favourites':
        setCount(favoritesItems.length);
        break;

      default:
        break;
    }
  }, [cartItems, favoritesItems, kind]);

  return (
    <button
      onClick={() => onClick()}
      className={classNames(`button-header ${className}`, {
        'button-header--is-active': category === kind,
      })}
    >
      <Icon className="button-header__img" name={name} />
      {showGuantity && (
        <div className="button-header__wrapper-number-elements">
          <p className="button-header__number-elements">{count}</p>
        </div>
      )}
    </button>
  );
};
