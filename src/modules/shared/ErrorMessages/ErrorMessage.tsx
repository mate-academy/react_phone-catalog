import { useContext } from 'react';
import { DarkModeContext } from '../../../Store/StoreThemeMode';
import classNames from 'classnames';

export const ErrorMessage = ({ title }: { title: string }) => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div className={classNames('error', { 'error--dark': isDark })}>
      <p className="body-text">{title}</p>
    </div>
  );
};
