import { useCallback } from 'react';

export const ToTopButton = () => {
  const handleClick = useCallback((
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <button
      type="button"
      className="footer__backToTop icon"
      onClick={handleClick}
    >
      Back to top
    </button>
  );
};
