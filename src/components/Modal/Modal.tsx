/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Transition } from 'react-transition-group';

import './Modal.scss';

type Props = {
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  withoutBackground?: boolean,
};

export const Modal: React.FC<Props> = React.memo(({
  active,
  setActive,
  children,
  withoutBackground = false,
}) => {
  return (
    <Transition
      in={active}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className={`modal modal--${state}`}
          onClick={() => setActive(false)}
        >
          {withoutBackground ? (
            <div className={`modal__content modal__content--without-background modal__content--${state}`}>
              {children}
            </div>
          ) : (
            <div
              className={`modal__content modal__content--with-background modal__content--${state}`}
              onClick={event => event.stopPropagation()}
            >
              {children}
            </div>
          )}
        </div>
      )}
    </Transition>
  );
});
