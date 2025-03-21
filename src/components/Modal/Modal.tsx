import s from './Modal.module.scss';
import { Button } from '../Button';
import { useSetShop } from '../../context/ShopContext';
import { Loader } from '../Loader';

type Props = {
  onModalOpen: (v: boolean) => void;
  isLoading: boolean;
};

export const Modal: React.FC<Props> = ({ onModalOpen, isLoading }) => {
  const setShop = useSetShop();

  const handleClearShop = () => {
    setShop([]);
    onModalOpen(false);
  };

  return (
    <div className={s.Modal}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.Modal__card}>
          <Button
            direction="close"
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
