/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

import './Modal.scss';
import { createPortal } from 'react-dom';
import { Typography } from '../../base';

type Props = {
  text: string;
  isOpen: boolean;
  onClose: (v: boolean) => void;
};

const ModalBase: React.FC<Pick<Props, 'text' | 'onClose'>> = ({
  text,
  onClose,
}) => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    onClose(false);
  };

  useEffect(() => {
    const timerToClose = setTimeout(() => onClose(false), 4000);

    return () => clearTimeout(timerToClose);
  }, []);

  useEffect(() => {
    const handleStopPropagation = (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
    };

    const wrapperModal = wrapper.current;
    const wrapperContent = content.current;

    wrapperModal?.addEventListener('click', handleClose);
    wrapperContent?.addEventListener('click', handleStopPropagation);

    return () => {
      wrapperModal?.removeEventListener('click', handleClose);
      wrapperContent?.removeEventListener('click', handleStopPropagation);
    };
  }, [wrapper, content]);

  return createPortal(
    <div className="modal" ref={wrapper}>
      <div className="modal__content" ref={content}>
        <Typography type="title" level="3">
          {text}
        </Typography>
      </div>
    </div>,
    document.body,
  );
};

export const Modal: React.FC<Props> = ({ isOpen, text, onClose }) => {
  return isOpen ? <ModalBase text={text} onClose={onClose} /> : null;
};
