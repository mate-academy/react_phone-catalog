import classNames from 'classnames';
import './Modal.scss';

type PropTypes = {
  active: boolean;
  setActive: (active: boolean) => void;
};

export const Modal: React.FC<PropTypes> = ({ active, setActive, children }) => {
  return (
    <button
      type="button"
      className={classNames(
        'modal',
        {
          'modal--active': active,
        },
      )}
      onClick={() => setActive(false)}
    >
      <button
        type="button"
        className="modal__content"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </button>
    </button>
  );
};
