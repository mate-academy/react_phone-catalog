import React from 'react';

type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const NextArrow: React.FC<ArrowProps> = ({
  className = '',
  style = {},
  onClick,
}) => {
  const mergedStyle: React.CSSProperties = {
    ...style,
    top: '-45px',
    right: '8px',
    left: 'auto',
    display: 'flex',
    backgroundColor: '#323542',
  };

  const isDisabled = className?.includes('slick-disabled');

  return (
    <button
      className={`${className} slider-btn slider-btn__next`}
      onClick={onClick}
      style={mergedStyle}
    >
      <img
        src={
          isDisabled
            ? './img/icons/arrow-right-disabled.svg'
            : './img/icons/arrow-right.svg'
        }
        alt="Arrow right"
      />
    </button>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({
  className = '',
  style = {},
  onClick,
}) => {
  const mergedStyle: React.CSSProperties = {
    ...style,
    top: '-45px',
    right: '56px',
    left: 'auto',
    display: 'flex',
    backgroundColor: '#323542',
  };

  const isDisabled = className?.includes('slick-disabled');

  return (
    <button
      className={`${className} slider-btn slider-btn__prev`}
      onClick={onClick}
      style={mergedStyle}
    >
      <img
        src={
          isDisabled
            ? './img/icons/arrow-left-disabled.svg'
            : './img/icons/arrow-left.svg'
        }
        alt="Arrow left"
      />
    </button>
  );
};
