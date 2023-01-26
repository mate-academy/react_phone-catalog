import { FC, useContext } from 'react';
import cn from 'classnames';
import { ThemeContext } from '../../contexts/ThemeContext';

const {
  NotFoundPage: notFoundPage,
  'NotFoundPage--dark': notFoundPageDark,
} = require('./NotFoundPage.module.scss');

export const NotFoundPage: FC = () => {
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={cn(
        notFoundPage,
        { [notFoundPageDark]: isThemeDark },
      )}
    >
      <h1>
        Page
        <br />
        {' '}
        <br />
        not found
      </h1>
    </div>
  );
};
