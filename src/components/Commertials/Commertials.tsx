import cn from 'classnames';
import commertials from './Commertials.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Commertials = () => {
  const [commLink] = useState('/');
  const [commNum] = useState('1');

  return (
    <div className={cn(commertials.commertials__content, commertials.content)}>
      <div className={commertials.content__top}>
        <button
          className={cn(
            commertials.content__button,
            commertials.content__button__left,
          )}
          disabled={commNum === '1'}
        ></button>
        <Link
          to={commLink}
          className={cn(
            commertials.content__commertial,
            commertials['content__commertial__' + commNum],
          )}
        ></Link>
        <button
          className={cn(
            commertials.content__button,
            commertials.content__button__right,
          )}
        ></button>
      </div>
      <div className={commertials.content__bottom}></div>
    </div>
  );
};
