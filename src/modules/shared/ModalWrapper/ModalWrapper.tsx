import { createPortal } from 'react-dom';
import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import { Container } from '../Container';
import classes from './modalWrapper.module.scss';

type Props = ComponentPropsWithoutRef<'div'> & {
  onClose?: () => void;
};

const MODAL_CONTAINER = document.getElementById('modal')!;

export const ModalWrapper: FC<Props> = ({
  onClick,
  onClose,
  className,
  children,
  ...props
}) => {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = event => {
    if (onClick) {
      onClick(event);
    }

    if (
      (event.target !== event.currentTarget &&
        event.target !== event.currentTarget.children[0]) ||
      !onClose
    ) {
      return;
    }

    onClose();
  };

  return createPortal(
    <div
      {...props}
      onClick={handleClick}
      className={cn(classes.modalWrapper, className)}
    >
      <Container className={classes.modalWrapper__container}>
        {children}
      </Container>
    </div>,
    MODAL_CONTAINER,
  );
};
