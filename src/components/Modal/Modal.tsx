/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import './Modal.scss';

type Props = {
  active: boolean;
  onClick: (v: boolean) => void;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ active, onClick, children }) => {
  return (
    <div
      className={classNames('modal', {
        'modal--is-active': active,
      })}
    >
      <div
        className={classNames('modal__content', {
          'modal__content--is-active': active,
        })}
      >
        <button
          type="button"
          className="button-icon button-icon--search-close modal__button"
          onClick={() => onClick(false)}
        />
        {children}
      </div>
    </div>
  );
};
