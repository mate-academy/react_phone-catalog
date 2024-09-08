import { FC, ReactNode } from 'react';
import cls from './modal.module.scss';
import { useModal } from '../../lib/hooks/useModal';
import classNames from 'classnames';
import { Portal } from '../Portal';
import { useTheme } from '../../../app/providers/ThemeProvider';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = props => {
  const { className, children, isOpen, onClose } = props;
  const { theme } = useTheme();

  const { isClosing, close: closeHandler } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });

  return (
    <Portal>
      <div
        className={classNames(
          cls.modal,
          {
            [cls.opened]: isOpen,
            [cls.isClosing]: isClosing,
          },
          [className, theme, 'app_modal'],
        )}
      >
        <div
          role="presentation"
          onClick={closeHandler}
          onKeyDown={closeHandler}
          className={classNames(cls.overlay)}
        />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
