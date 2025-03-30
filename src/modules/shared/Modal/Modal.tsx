import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createContainer } from '../../../utils/createContainer';
import { Portal } from '../Portal/Portal';

const MODAL_CONTAINER_ID = 'modal-container-id';

type Props = { onClose?: () => void; title: string; children: React.ReactNode };

export const Modal = (props: Props) => {
  const { onClose, title, children } = props;

  const [isMounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    const handleWrapperClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && rootRef.current === target) {
        onClose?.();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('click', handleWrapperClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('click', handleWrapperClick);
      window.removeEventListener('keydown', handleEscapePress);

      document.body.style.paddingRight = ``;
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className="overlay" ref={rootRef}>
        <div className="modal">
          <button type="button" onClick={handleClose}>
            x
          </button>

          <h2 className="title title--h2">{title}</h2>

          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};
