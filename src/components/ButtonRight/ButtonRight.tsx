import React from 'react';
import './ButtonRight.scss';

type Props = {
  handleClick: () => void;
  transform: number;
  productsNumber: number;
};

export const ButtonRight: React.FC<Props> = ({
  handleClick,
  transform,
  productsNumber,
}) => {
  return (
    <button
      type="button"
      className="button-right"
      onClick={handleClick}
      disabled={transform === (-(productsNumber - 4) * 288)}
    >
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z"
          fill={
            transform !== (-(productsNumber - 4) * 288)
              ? '#313237'
              : '#e2e6e9'
          }
        />
      </svg>
    </button>
  );
};
