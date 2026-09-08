import { useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';
import classNames from 'classnames';
import React from 'react';

interface Props {
  classNameProps?: string;
}

export const GoBack: React.FC<Props> = ({ classNameProps }) => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(styles['go-back'], classNameProps)}
      onClick={() => navigate('..')}
    >
      <span className={classNames('icon', 'icon--arrow-left-hover')}></span>
      Back
    </div>
  );
};
