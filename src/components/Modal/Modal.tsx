import classNames from 'classnames';

type Props = {
  parenClassName?: string;
  title: string;
  confirmFunction: () => void;
  cancelFunction: () => void;
};

export const Modal: React.FC<Props> = ({
  title,
  confirmFunction,
  cancelFunction,
  parenClassName = '',
}) => {
  return (
    <div
      className={classNames('modal', {
        [`${parenClassName}__modal`]: parenClassName,
      })}
    >
      <div onClick={cancelFunction} className="modal__inner-block">
        <div className="modal__text">{title}</div>
        <div className="modal__buttons">
          <button onClick={confirmFunction} className="modal__confirm">
            Confirm
          </button>
          <button onClick={cancelFunction} className="modal__cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
