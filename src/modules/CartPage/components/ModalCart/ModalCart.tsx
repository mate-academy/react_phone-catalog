import React, { SetStateAction, useContext } from 'react';
import './ModalCart.scss';
import { DispatchContext } from '../../../../contexts/AppContext/AppContext';
import { getIconSrc } from '../../../../helpers/getIconSrc';
import {
  ThemeContext,
  ThemeType,
} from '../../../../contexts/ThemeContext/ThemeContext';
import classNames from 'classnames';

type Props = {
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
};

export const ModalCart: React.FC<Props> = ({ setShowModal }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useContext(DispatchContext);

  const handleClear = () => {
    setShowModal(false);
    dispatch({ type: 'CLEAR_CART' });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="modalCart__overlay">
      <div
        className={classNames('modalCart__content', {
          dark: theme === ThemeType.DARK,
        })}
      >
        <button className="modalCart__closeButton" onClick={handleClose}>
          <img
            src={getIconSrc('close', theme)}
            alt=""
            className="modalCart__close icon"
          />
        </button>
        <p className="modalCart__text h4">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>

        <button
          className={classNames('modalCart__button', {
            dark: theme === ThemeType.DARK,
          })}
          onClick={handleClear}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};
