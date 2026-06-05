import { useCart } from '@/app/providers/Cart';
import styles from './style.module.scss';
import { ButtonThird } from '@/components/ButtonThird/ButtonThird';
import { useEffect, useRef } from 'react';
import { ButtonBuy } from '@/components/ButtonBuy/ButtonBuy';

export const ModalDialog = ({
  isOpen,
  isSetOpen,
}: {
  isOpen: boolean;
  isSetOpen: (value: boolean) => void;
}) => {
  const { clearCart } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && overlayRef.current && !overlayRef.current.contains(target)) {
        isSetOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('pointerdown', handle);
    }

    return () => {
      document.removeEventListener('pointerdown', handle);
      document.body.style.overflow = '';
    };
  }, [isOpen, isSetOpen]);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div ref={overlayRef} className={styles.content}>
            <h3 className={styles.title}>
              Checkout is not implemented yet. Do you want to clear the Cart?
            </h3>
            <div className={styles.buttonsBox}>
              <ButtonThird
                onClick={() => {
                  isSetOpen(false);
                }}
                className={styles.button}
              >
                Cancel
              </ButtonThird>
              <ButtonBuy
                selected={false}
                onClick={() => {
                  clearCart();
                }}
                className={styles.button}
              >
                Confirm
              </ButtonBuy>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
