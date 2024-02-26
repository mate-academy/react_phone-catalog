import cn from 'classnames';

import './Modal.scss';

type Props = {
  text: string,
  isActive: boolean,
  setIsModalActive: (value: boolean) => void
};

export const Modal:React.FC<Props> = ({
  text,
  isActive,
  setIsModalActive,
}) => {
  return (
    <div className={cn('modal',
      { 'modal--active': isActive })}
    >
      <div className="modal__content">
        <p className="modal__text">
          {text}
        </p>
        <button
          type="button"
          className="modal__button"
          onClick={() => {
            setIsModalActive(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};
