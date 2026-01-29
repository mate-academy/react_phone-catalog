import React from 'react';

interface Props {
  title: string;
  description?: string;
}

export const ModalHeader: React.FC<Props> = ({ title, description }) => {
  const modalDescription = description ? (
    <p className="modal__description">{description}</p>
  ) : (
    ''
  );

  return (
    <div className="modal__header">
      <h3 className="modal__title">{title}</h3>
      {modalDescription}
    </div>
  );
};
