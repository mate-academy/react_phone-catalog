// import { useContext, useEffect } from 'react';
// import { CSSTransition } from 'react-transition-group';
// import { ReactSVG } from 'react-svg';

// import { ModalContext } from '../../contexts/modalContext';
// import './Modal.scss';

// interface ModalProps {
//   children: React.ReactNode;
// }

// export const Modal: React.FC<ModalProps> = ({ children }) => {
//   const { isOpen, setIsOpen } = useContext(ModalContext);

//   const handleModalClick = (
//     event: React.MouseEvent<HTMLDivElement, MouseEvent>,
//   ) => {
//     if (event.target === event.currentTarget) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'initial';
//     }
//   }, [isOpen]);

//   return (
//     <CSSTransition timeout={300} in={isOpen} unmountOnExit>
//       <div className="modal" onClick={handleModalClick} aria-hidden>
//         <CSSTransition
//           timeout={300}
//           in={isOpen}
//           classNames="modal-fade"
//           unmountOnExit
//         >
//           <div className="modal__content">
//             <div
//               className="modal__cross"
//               onClick={() => setIsOpen(false)}
//               aria-hidden
//             >
//               <ReactSVG src="img/icons/Close.svg" />
//             </div>

//             {children}
//           </div>
//         </CSSTransition>
//       </div>
//     </CSSTransition>
//   );
// };

import React, { useContext, useEffect, forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactSVG } from 'react-svg';

import { ModalContext } from '../../contexts/modalContext';
import './Modal.scss';

interface ModalProps {
  children: React.ReactNode;
}

interface ModalContentProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setIsOpen: (v: boolean) => void;
}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ onClick, setIsOpen, children }, ref) => (
    <div className="modal" onClick={onClick} ref={ref} aria-hidden>
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
    </div>
  ),
);

ModalContent.displayName = 'ModalContent';

export const Modal: React.FC<ModalProps> = ({ children }) => {
  const { isOpen, setIsOpen } = useContext(ModalContext);

  const handleModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'initial';
  }, [isOpen]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={300}
      classNames="modal-fade"
      unmountOnExit
    >
      <ModalContent onClick={handleModalClick} setIsOpen={setIsOpen}>
        {children}
      </ModalContent>
    </CSSTransition>
  );
};
