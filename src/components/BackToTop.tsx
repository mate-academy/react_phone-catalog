import React from 'react';

const image
= '_new/img/buttons/VectorUp.svg';

export const BackToTop: React.FC = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="back-to-top">
      <div className="small_text">Back to top</div>
      <button
        className="back-to-top__button"
        type="button"
        onClick={handleScroll}
      >
        <img src={image} alt="back_to_up" />
      </button>
    </div>
  );
};
