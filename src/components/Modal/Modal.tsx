import { Dispatch, FC, SetStateAction } from 'react';
import './modal.scss';

type Props = {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

function refreshPage() {
  window.location.reload();
}

export const Modal: FC<Props> = ({ setIsOpenModal }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <p className="modal__title">
          <span>We are sorry,</span>
          <span>but this feature is not implemented yet</span>
        </p>
        <button
          type="button"
          className="modal__button button"
          onClick={() => {
            setIsOpenModal(false);
            refreshPage();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
