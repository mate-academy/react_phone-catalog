/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

type PropsArrow = {
  move: () => void;
  disabled?: boolean;
};

type PropsNumberAndSymbols = {
  move: (page: number) => void;
  active?: boolean;
  number?: number;
};

export const MoveButton: React.FC<PropsArrow> = React.memo(
  ({ move, disabled }) => {
    return (
      <button
        type="button"
        onClick={move}
        className={classNames('button', { disabled })}
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
            d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
            fill="#313237"
            className={classNames('button__action', { disabled })}
          />
        </svg>
      </button>
    );
  },
);

export const NumberOrSymbol: React.FC<PropsNumberAndSymbols> = React.memo(
  ({ move, active, number }) => {
    const setPage = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      const page = parseInt(event.currentTarget.value, 10);

      return move(page);
    };

    return (
      <button
        type="button"
        value={number}
        onClick={setPage}
        className={classNames('button', { active })}
      >
        {number}
      </button>
    );
  },
);

export const ReloadButton = React.memo(() => {
  return (
    <button
      type="button"
      className="reload"
      onClick={() => document.location.reload()}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="250.000000pt"
        height="250.000000pt"
        viewBox="0 0 250.000000 250.000000"
        preserveAspectRatio="xMidYMid meet"
        className="reload__icon"
      >
        <g
          transform="translate(0.000000,250.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M1100 2124 c-91 -11 -220 -53 -310 -101 -313 -167 -495 -496 -469
              -850 13 -183 57 -308 160 -459 173 -253 516 -410 819 -373 89 10 179 30 225
              48 118 48 227 117 318 201 l68 63 -78 79 c-42 43 -81 78 -86 78 -4 0 -30 -22
              -57 -50 -170 -169 -408 -237 -635 -180 -227 58 -390 209 -476 440 -21 58 -24
              82 -24 210 0 158 7 190 62 300 190 377 675 487 1008 230 136 -105 223 -254
              254 -438 7 -40 10 -76 7 -79 -3 -3 -53 -5 -111 -4 -69 0 -105 -3 -105 -10 0
              -12 319 -329 331 -329 14 0 329 315 329 329 0 9 -27 12 -99 10 -54 -1 -103 1
              -108 4 -5 3 -10 27 -11 54 -4 92 -28 190 -69 281 -12 29 -23 54 -23 57 0 2
              -16 32 -36 66 -45 76 -168 207 -249 264 -65 46 -184 104 -255 124 -25 8 -58
              17 -75 22 -33 11 -250 20 -305 13z"
          />
        </g>
      </svg>
      Reload
    </button>
  );
});

export const BackButton: React.FC<PropsArrow> = React.memo(({ move }) => {
  return (
    <button type="button" onClick={move} className="button back">
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
          d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z"
          fill="#313237"
          className="button"
        />
      </svg>
      <span>Back</span>
    </button>
  );
});
