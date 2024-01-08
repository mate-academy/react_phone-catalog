import { useLayoutEffect } from 'react';
import { nanoid } from 'nanoid';
import { counter, useModalStore } from '../../store/store';

export const Modal: React.FC = () => {
  const { isOpen, setIsOpen } = useModalStore();
  const { setCount } = counter();

  const handleToggleModal = () => {
    setCount('clearCart');
    setIsOpen(!isOpen);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setCount('clearCart');
      handleToggleModal();
    }
  };

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('scroll-lock', isOpen);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <section
          className="modal"
          onClick={() => {
            setCount('clearCart');
            setIsOpen(!isOpen);
          }}
          onKeyDown={e => handleKeyPress(e)}
          role="button"
          tabIndex={0}
          key={nanoid()}
        >
          <p className="h1 text-altGreen">Thank you for purchasing!</p>
          <p className="text-elements">have a nice day!</p>
        </section>
      )}
    </>
  );
};
