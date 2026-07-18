import { Link } from 'react-router-dom';
import './MainLogo.scss';
import { useTheme } from '../../../../context/ThemeContext';

type Props = {
  className: string;
};

export const MainLogo: React.FC<Props> = ({ className }) => {
  const { themeColor } = useTheme();

  return (
    <Link to={'/home'} className={`logo ${className}`}>
      <img
        src={
          themeColor === 'dark'
            ? 'icon/main-logo-dark.svg'
            : 'icon/main-logo-light.svg'
        }
        alt="main logo"
        className="logo__img"
      />
    </Link>
  );
};
