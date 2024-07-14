import { useLocation, useNavigate } from 'react-router-dom';
import style from './BackButton.module.scss';
import { LanguageContext } from '../../store/LanguageProvider';
import { useContext } from 'react';
import { ThemeContext } from '../../store/ThemeProvider';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { pathname } = useLocation();

  const handleBackPath = (p: string) => {
    const result = p.split('/');

    return result.slice(0, result.length - 1).join('');
  };

  return (
    <span
      className={classNames(`${style.back} ${className}`, {
        [style.back__darkTheme]: theme,
      })}
      onClick={() => navigate(`../../${handleBackPath(pathname)}`)}
    >
      {t('back')}
    </span>
  );
};
