import React, { useContext } from 'react';
import { DispatchContext } from 'src/store';
import { ActionTypes } from 'src/types/ActionTypes';
import './Modal.scss';

interface Props {
  handleSetModal: () => void;
}

const Modal: React.FC<Props> = ({ handleSetModal }) => {
  const dispatch = useContext(DispatchContext);

  const handleClick = () => {
    dispatch({ type: ActionTypes.ClearCart });
    handleSetModal();
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleSetModal();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal__wrapper" onClick={e => e.stopPropagation()}>
        <h3 className="modal__title">
          Checkout is not implemented yet. Do you want to clear the Cart?
        </h3>
        <div className="modal__buttons">
          <button className="modal__submit" onClick={() => handleClick()}>
            Yes
          </button>
          <button className="modal__decline" onClick={() => handleSetModal()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
