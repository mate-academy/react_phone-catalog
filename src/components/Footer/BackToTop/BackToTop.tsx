import React from 'react';
import backToTopStyles from './BackToTop.module.scss';

export const BackToTop = () => {
  return (
    <div className={backToTopStyles.backToTop}>
      <p className={backToTopStyles.backToTop__text}>Back to top</p>
      <div
        className={backToTopStyles.backToTop__icon}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="
              M3.52876 10.4714
              C3.26841 10.211 3.26841 9.7889 3.52876 9.52855
              L7.52876 5.52856
              C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856
              L12.4716 9.52856
              C12.7319 9.78891 12.7319 10.211 12.4716 10.4714
              C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714
              L8.00016 6.94277
              L4.47157 10.4714
              C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z
            "
          />
        </svg>
      </div>
    </div>
  );
};
