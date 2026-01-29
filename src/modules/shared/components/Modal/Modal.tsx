import React from 'react';

interface Props {
  children: React.ReactNode;
  // setStatus: () => void;
  title?: string;
  description?: string;
}

export const Modal: React.FC<Props> = ({ children }) => {
  return (
    <div className="modal__container">
      <dialog className="modal" open>
        {children}
      </dialog>
    </div>
  );
};
