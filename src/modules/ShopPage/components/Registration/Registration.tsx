import React, { useContext } from 'react';
import cn from 'classnames';
import style from './Registration.module.scss';
import { DispatchShop } from '../../../../provider/GlobalProvider';

type Props = {
  handleRegistration: () => void;
  registration: boolean;
};

export const Registration: React.FC<Props> = ({
  handleRegistration,
  registration,
}) => {
  const dispatchShop = useContext(DispatchShop);

  const clearShop = () => {
    localStorage.removeItem('shop');
    dispatchShop({ type: 'clear' });
    handleRegistration();
  };

  return (
    <div
      className={cn(style.registration, {
        [style['registration--active']]: registration,
      })}
    >
      <div className={style.registration__content}>
        <p className={style.registration__text}>
          Checkout is not implemented yet. Do you want to clear the Cart?:
        </p>
        <div className={style.registration__buttons}>
          <button
            className={style.registration__button}
            onClick={() => clearShop()}
          >
            Yes
          </button>
          <button
            className={style.registration__button}
            onClick={handleRegistration}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
