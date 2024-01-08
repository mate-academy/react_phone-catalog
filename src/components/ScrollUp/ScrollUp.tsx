import { useState, useEffect } from 'react';

export const ScrollUp:React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const scrollPageTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledEnough = window.scrollY > window.innerHeight;

      setShowButton(isScrolledEnough);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showButton
    && (
      <button
        type="button"
        className="scroll-up bg-inherit"
        onClick={scrollPageTop}
      >
        <img
          src="img/svg/arrow-right.svg"
          alt="arrow"
        />
      </button>
    )}
    </>
  );
};
