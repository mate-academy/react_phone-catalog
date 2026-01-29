import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<Props> = ({ children }) => {
  return <div className="modal__footer">{children}</div>;
};
