/* eslint-disable max-len */

import { useState } from 'react';
import { nanoid } from 'nanoid';

type Props = {
  params: { obj: URLSearchParams; setter: (arg: URLSearchParams) => void };
  page: number;
  max: number;
  itemsOnPage: number;
};

export const Pagination: React.FC<Props> = ({
  page,
  max,
  itemsOnPage,
  params,
}) => {
  const [pageNumber] = useState(1);
  const buttonCount = Math.ceil(max / itemsOnPage) || 1;
  const handler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;

    params.obj.set('page', button.innerText);
    params.setter(params.obj);
  };

  const stepOnPage = (value: number) => {
    let res = value;

    if (res >= buttonCount) {
      res = buttonCount;
    }

    if (value < 1) {
      res = 1;
    }

    params.obj.set('page', String(res));
    params.setter(params.obj);
  };

  return buttonCount !== 1 ? (
    <section className=" mt-10 mb-20 ">
      <div className="flex gap-4 mx-auto w-min">
        <button
          type="button"
          className={`button ${page === 1 ? 'inactive' : ''}`}
          onClick={() => stepOnPage(page - 1)}
        >
          <img src="img/svg/arrow-left.svg" alt="previous" />
        </button>
        <div className="flex gap-2">
          {new Array(buttonCount).fill('').map((empty, i) => (
            <button
              key={nanoid()}
              onClick={(e) => handler(e)}
              type="button"
              className={`button ${
                page === pageNumber + i ? 'button-pushed' : empty
              }`}
            >
              {pageNumber + i}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`button ${page === buttonCount ? 'inactive' : ''}`}
          onClick={() => stepOnPage(page + 1)}
        >
          <img src="img/svg/arrow-right.svg" alt="previous" />
        </button>
      </div>
    </section>
  ) : (
    <></>
  );
};
