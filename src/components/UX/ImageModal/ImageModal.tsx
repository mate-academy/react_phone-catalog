import React, { useEffect } from 'react';
import './image-modal.scss';
import { useCloseClick } from '../../../customHooks/useCloseClick';

type Props = {
  url: string;
  onClose: (v: string) => void;
};

export const ImageModal: React.FC<Props> = ({
  url,
  onClose,
}) => {
  const [ref, isOpen] = useCloseClick(true);

  useEffect(() => {
    return () => {
      onClose('');
    };
  }, [isOpen]);

  return (
    <div className="image-modal" ref={ref}>
      <div className="image-modal__content">
        <img
          src={url}
          alt="Modal"
          className="image-modal__img"
        />
      </div>
    </div>
  );
};
