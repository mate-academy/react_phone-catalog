import styles from './BackLink.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { SvgIcon } from '../SvgIcon';
import React from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

export const BackLink: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  const onClickHandler = (
    evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    evt.preventDefault();
    navigate(-1);
  };

  return (
    <Link
      to={''}
      className={cn(styles['back-link'], className)}
      onClick={onClickHandler}
    >
      <SvgIcon type="arrow" className={styles['back-link__icon']} />
      <p className={styles['back-link__text']}>Back</p>
    </Link>
  );
};
