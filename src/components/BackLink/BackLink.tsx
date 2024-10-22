import styles from './BackLink.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { SvgIcon } from '../SvgIcon';

export const BackLink = () => {
  const navigate = useNavigate();

  const onClickHandler = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <Link to={''} className={styles['back-link']} onClick={onClickHandler}>
      <SvgIcon type="arrow" className={styles['back-link__icon']} />
      <p className={styles['back-link__text']}>Back</p>
    </Link>
  );
};
