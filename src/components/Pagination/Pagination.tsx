import React from 'react';
import classNames from 'classnames/bind';
import './Pagination.scss';

interface Props {
  total: number,
  step: number,
  page: number,
  changePage: (arg0:number) => void,
  arrPages: number[]
}

export const Pagination: React.FC<Props> = ({
  total, step, page, changePage, arrPages,
}) => {
  return (
    <div className="phones__move">
      <button
        type="button"
        aria-label="Mute volume"
        className="phones__left-right phones__left"
        disabled={page === 1}
        onClick={() => {
          changePage(page - 1);
        }}
      />
      {arrPages.map(number => (
        <button
          type="button"
          aria-label="Mute volume"
          key={number}
          className={classNames('phones__button', {
            'phones__button--focus': number === page,
          })}
          onClick={() => {
            changePage(number);
          }}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        aria-label="Mute volume"
        className="phones__left-right phones__right"
        disabled={page === Math.ceil(total / step)}
        onClick={() => {
          changePage(page + 1);
        }}
      />
    </div>
  );
};
