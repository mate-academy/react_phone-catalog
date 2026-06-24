import s from './ModalCheckout.module.scss';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalCheckout: React.FC<Props> = ({ onClose, onConfirm }) => (
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Not implemented</p>
        <button
          className="delete"
          aria-label="close"
          onClick={onClose}
        ></button>
      </header>
      <section className="modal-card-body">
        <p className="mb-0">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
      </section>
      <footer className="modal-card-foot">
        <div className="buttons">
          <button className={`button ${s.confirm_button}`} onClick={onConfirm}>
            Clear the Cart
          </button>
          <button className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </footer>
    </div>

    {/* <div className="modal-content">
      <p className="">
        Checkout is not implemented yet. Do you want to clear the Cart?
      </p>
    </div>
    <button className="delete" aria-label="close"></button>

    <div className="buttons">
      <button className="button is-success">Save changes</button>
      <button className="button">Cancel</button>
    </div> */}
  </div>
);
