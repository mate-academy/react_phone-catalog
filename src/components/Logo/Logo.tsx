import classNames from 'classnames';
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import './logo.scss';

interface Props {
  header?: boolean;
}

export const Logo: FC<Props> = ({ header }) => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <Link to="/" className={classNames('logo', {'logo--header': header})}>
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
}
