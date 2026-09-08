import s from './Modal.module.scss';
import * as cartActions from '../../store/cart';
import CloseIcon from '../../img/icons/icon-close.svg?react';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../hooks';

type Props = {
  onModalOpen: (v: boolean) => void;
  isLoading: boolean;
};

export const Modal: React.FC<Props> = ({ onModalOpen, isLoading }) => {
  const dispatch = useAppDispatch();

  const handleClearShop = () => {
    dispatch(cartActions.clear());
    onModalOpen(false);
  };

  return (
    <div className={s.Modal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.Modal__card}>
          <Button
            IconProp={CloseIcon}
            onClick={() => onModalOpen(false)}
            className={s.Modal__close}
          />
          <h3 className={s.Modal__title}>
            Checkout is not implemented yet. <br />
            Do you want to clear the Cart?
          </h3>
          <div className={s.Modal__buttons}>
            <button className={s.Modal__choose} onClick={handleClearShop}>
              Yes
            </button>
            <button
              className={s.Modal__choose}
              onClick={() => onModalOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
