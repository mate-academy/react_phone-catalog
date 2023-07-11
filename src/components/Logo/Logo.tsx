import classNames from 'classnames';
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import './logo.scss';

interface Props {
  header?: boolean;
  setIsMenuClicked?: (isMenuClicked: boolean) => void;
}

export const Logo: FC<Props> = ({ header, setIsMenuClicked }) => {
  const theme = useAppSelector(state => state.theme.value);
  const handleLogoClick = () => {
    if (setIsMenuClicked) {
      setIsMenuClicked(false);
    }
  }

  return (
    <Link
      to="/" 
      className={classNames('logo', {'logo--header': header})}
      onClick={handleLogoClick}
    >
        {theme === 'light' ? (
          <img src="new/img/icons/LOGO-dark.svg" alt="Logo" />
        ) : (
          <img src="new/img/icons/LOGO-light.svg" alt="Logo" />
        )}
    </Link>
  )
}

Logo.defaultProps = {
  header: false,
  setIsMenuClicked: () => {},
}
