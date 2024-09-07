type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export const ModalCheckout: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-checkout">
      <span className="modal-checkout__title">
        Checkout is not implemented yet. <br /> Do you want to clear the Cart?
      </span>

      <button
        className="modal-checkout__btn modal-checkout__btn--confirm button"
        type="button"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <button
        className="modal-checkout__btn button button--red"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};
