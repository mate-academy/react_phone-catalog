import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const TopButton = () => {
  const { pathname } = useLocation();
  const [isScroll, setIsScroll] = useState(false);

  const checkScroll = () => {
    setIsScroll(document.body.scrollHeight > window.innerHeight);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('scroll', checkScroll);
    };
  }, [isScroll, pathname]);

  return (
    <button
      className={classNames('button-top', { isVisible: !isScroll })}
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      Back to top
      <img
        className="button-top__img"
        src="img/icons/ArrowUp.png"
        alt="back"
      />
    </button>
  );
};
