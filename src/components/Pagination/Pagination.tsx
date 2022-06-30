import { MouseEventHandler } from 'react';
import classNames from 'classnames';
import './Pagination.scss';

type Props = {
  pages: number,
  index: {
    start: number,
    end: number,
  },
  length: number,
  back: MouseEventHandler<HTMLButtonElement>,
  forward: MouseEventHandler<HTMLButtonElement>,
  pageNumber: MouseEventHandler<HTMLButtonElement>,
  step: number,
};

export const Pagination: React.FC<Props> = ({
  pages, index, length, back, forward, pageNumber, step,
}) => {
  const numbers:number[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < pages; i++) {
    numbers.push(i + 1);
  }

  if (pages > 1) {
    return (
      <div className="Pagination">
        <button
          className="button Pagination--left"
          type="button"
          name="hotBack"
          onClick={back}
          disabled={index.start === 0}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="inherit"
              clipRule="inherit"
              d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
            />
          </svg>
        </button>

        {numbers.map((number: number) => {
          return (
            <button
              type="button"
              className={
                classNames(
                  'button',
                  {
                    'button--active': index.end / step === number
                  || (index.start === 0 && number === 1),
                  },
                )
              }
              key={number}
              value={number}
              onClick={pageNumber}
            >
              {number}
            </button>
          );
        })}

        <button
          className="button button--right Pagination--right"
          type="button"
          name="hotForward"
          disabled={index.end >= length}
          onClick={forward}
        >
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="inherit"
              clipRule="inherit"
              d="M5.47136 0.528606C5.21101 0.268256 4.7889
                  0.268256 4.52855 0.528606L0.528555
                  4.52861C0.268205 4.78896 0.268205
                  5.21107 0.528555 5.47141L4.52855
                  9.47141C4.7889 9.73176 5.21101
                  9.73176 5.47136 9.47141C5.73171
                  9.21107 5.73171 8.78896 5.47136
                  8.52861L1.94277 5.00001L5.47136
                  1.47141C5.73171 1.21107 5.73171
                  0.788955 5.47136 0.528606Z"
            />
          </svg>
        </button>
      </div>
    );
  }

  return null;
};
