
import React from 'react';
import './BackToTop.scss';

export const BackToTop = () => {


  const handleScrollUp = () => {
    console.log(document.body.clientHeight, window.screen.availHeight)
    const scroll = () => {
      setTimeout(() => {
        console.log(document.body.clientHeight, window.screen.availHeight)
        window.scrollBy(0, -20);
        if (window.scrollY > 0) {
          scroll();
        }
      }, 1);
    }
    scroll();

  }

  return (
    <div className="BackToTop">
      <span
        className="BackToTop__legend"
      >
        Back to top
      </span>
      <button
        className="BackToTop__button"
        type='button'
        onClick={handleScrollUp}
      >
      </button>
    </div>
  )
}
