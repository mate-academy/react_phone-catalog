import { useContext, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';

import { ModalContext } from '../../storage/modalContext';
import './modal.scss';

export const Modal: React.FC = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isOpen]);

  return (
    <CSSTransition timeout={300} in={isOpen} unmountOnExit>
      <div className="modal" onClick={handleModalClick} aria-hidden>
        <CSSTransition
          timeout={300}
          in={isOpen}
          classNames="modal-fade"
          unmountOnExit
        >
          <div className="modal__content">
            <div
              className="modal__cross"
              onClick={() => setIsOpen(false)}
              aria-hidden
            >
              <ReactSVG src="img/icons/Close.svg" />
            </div>

            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};
