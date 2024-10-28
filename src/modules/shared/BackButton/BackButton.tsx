import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { Arrow } from '../Icons/Arrow/Arrow';
import React from 'react';
import classNames from 'classnames';

type Props = {
  otherClass?: string;
};

export const BackButton: React.FC<Props> = ({ otherClass }) => {
  const navigate = useNavigate();

  return (
    <button
      className={classNames(styles.BackButton, otherClass)}
      onClick={() => navigate(-1)}
    >
      <Arrow />
      Back
    </button>
  );
};
