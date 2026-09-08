import './ModalWindow.scss';

import { useContext } from 'react';
import ReactDOM from 'react-dom';
import { LocalStorageContext } from '../../../app/Contexts/LocalStorageContext';

type Props = {
  cancel: () => void;
};

export const Modal: React.FC<Props> = ({ cancel }) => {
  const { checkout } = useContext(LocalStorageContext);

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal__info">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </p>
        <button className="modal__confirm" onClick={checkout}>
          Confirm
        </button>
        <button className="modal__cancel" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};
