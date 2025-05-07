import './Modal.scss';

interface Props {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<Props> = ({ text, onConfirm, onCancel }) => {
  return (
    <div className="modal" onClick={onCancel}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <p className="modal__text">{text}</p>
        <div className="modal__buttons">
          <button
            className="modal__btn modal__btn--confirm"
            onClick={onConfirm}
          >
            Yes, clear cart
          </button>
          <button className="modal__btn modal__btn--cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
