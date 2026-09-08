import { useContext } from 'react';
import './ModalDialog.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

const getModalRoot = () => {
  let root = document.getElementById('modal-root');

  if (!root) {
    root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
  }

  return root;
};

const modalRoot = getModalRoot();

type Props = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
};

export const ModalDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const { setCart } = useContext(GlobalContext);

  return createPortal(
    <div
      className={classNames(
        'modal',
        {'modal--open': isOpen},
      )}
    >
      <div className="modal__content">
        <div
          className="modal__close"
          onClick={() => onClose(false)}
        />
        <span className="modal__title">
          <p>
            Checkout is not implemented yet.
          </p>
          <br />
          <p>
            Do you want to clear the Cart?
          </p>
        </span>
        <div className="modal__btns">
          <button
            className="modal__btn modal__btn--no"
            onClick={() => onClose(false)}
          >
            Cancel
          </button>
          <button 
            className="modal__btn modal__btn--yes"
            onClick={() => {
              setCart([]);
              onClose(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

