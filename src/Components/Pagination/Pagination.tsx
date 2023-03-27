import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Pagination.scss';

type Props = {
  amount: number,
};

export const Pagination: FC<Props> = ({ amount = 4 }) => {
  const amountPage = [];

  for (let i = 1; i <= amount; i += 1) {
    amountPage.push(i);
  }

  return (
    <div className="pagination">
      <Link
        to="/#"
        className="pagination__button pagination__arrow pagination__arrow--prev"
      />

      <div className="pagination__pages">
        {amountPage.map(num => (
          <div
            key={num}
            className={classNames(
              'pagination__page pagination__button',
              { 'pagination__page--active': num === 3 },
            )}
          >
            {num}
          </div>
        ))}
      </div>
      <Link
        to="/#"
        className="pagination__button pagination__arrow pagination__arrow--next"
      />
    </div>
  );
};
