import { Button } from '../../../../shared/ui/Button';
import { ButtonAdd } from '../../../../shared/ui/ButtonAdd';
import { useCart } from '../../../../store/CartContext';
import { IconId } from '../../../../types/icons';
import style from './CartModal.module.scss';

type Props = {
  closeModal: () => void;
};

export const CartModal: React.FC<Props> = ({ closeModal }) => {
  const cart = useCart();

  return (
    <div className={style.modalWrapper}>
      <Button
        className={style.buttonClose}
        onClick={closeModal}
        iconId={IconId.Close}
      />
      <span className={style.modalText}>
        Checkout is not implemented yet. <br /> Do you want to clear the Cart?
      </span>
      <div className={style.buttonContainer}>
        <ButtonAdd title="Submit" onClick={cart.submitCart} />
      </div>
    </div>
  );
};
