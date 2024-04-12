import { ReactNode } from 'react';
import './Modal.scss';
import classNames from 'classnames';

type ModalProps = {
  active: boolean,
  setActive: (type: boolean) => void,
  children: ReactNode,
};

export const Modal: React.FC<ModalProps>
  = ({
    active,
    setActive,
    children,
  }) => {
    return (
      <div
        className={classNames(
          'modal',
          { 'modal--active': active },
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => setActive(false)}
        role="button"
        tabIndex={0}
      >
        <div
          className={classNames(
            'modal__content',
            { 'modal__content--active': active },
          )}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          role="button"
          tabIndex={0}
        >
          {children}
        </div>
      </div>
    );
  };
