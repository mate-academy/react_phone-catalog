import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { TABTARGETS } from '../../constants/TABTARGETS';

interface Props {
  setOpen: (open: boolean) => void;
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  setOpen,
}) => {
  const [active, setActive] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActive(true);

    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';

    if (scrollWidth) {
      document.body.style.setProperty('padding-right', `${scrollWidth}px`);
    }

    if (modalRef.current) {
      const focusElements: NodeListOf<HTMLElement> =
        modalRef.current.querySelectorAll(TABTARGETS);

      if (focusElements && !modalRef.current.contains(document.activeElement)) {
        focusElements[0].focus();
      }
    }

    const onKeyEvents = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setOpen(false);
      }

      if (e.code === 'Tab' && modalRef.current) {
        const focusElements: NodeListOf<HTMLElement> =
          modalRef.current.querySelectorAll(TABTARGETS);

        const focusElementsArr = Array.from(focusElements);

        if (focusElementsArr.length > 0) {
          const focusElementIndex = focusElementsArr.indexOf(
            document.activeElement as HTMLElement,
          );

          if (
            focusElementIndex === focusElementsArr.length - 1 &&
            !e.shiftKey
          ) {
            e.preventDefault();
            focusElementsArr[0].focus();
          } else if (focusElementIndex === 0 && e.shiftKey) {
            e.preventDefault();
            focusElementsArr[focusElementsArr.length - 1].focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyEvents);

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.removeEventListener('keydown', onKeyEvents);
    };
  }, []);

  return createPortal(
    <div
      className={cn(styles.overlay, { [styles.open]: active })}
      onClick={() => setOpen(false)}
      ref={modalRef}
    >
      <div
        className={cn(styles.content, { [styles.open]: active })}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};
