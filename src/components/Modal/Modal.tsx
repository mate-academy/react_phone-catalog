import './Modal.scss';
import { ReactSVG } from 'react-svg';
import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ModalContext } from '../../storage/ModalContext';

export const Modal: React.FC = ({ children }) => {
  const { isModalShow, setIsModalShow } = useContext(ModalContext);
  const [showForm, setShowForm] = useState(false);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      setIsModalShow(false);
    }
  };

  useEffect(() => {
    if (isModalShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isModalShow]);

  return (
    <CSSTransition
      timeout={300}
      in={isModalShow}
      onEntering={() => setShowForm(true)}
      unmountOnExit
    >
      <div
        className="modal"
        onClick={handleModalClick}
        aria-hidden
      >
        <CSSTransition
          in={showForm}
          timeout={300}
          classNames="modal-fade"
          onExiting={() => setIsModalShow(false)}
          unmountOnExit
        >
          <div className="modal__content">
            <div
              className="modal__cross"
              onClick={() => setShowForm(false)}
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
