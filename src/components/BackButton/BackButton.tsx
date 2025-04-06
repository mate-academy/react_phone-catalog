import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BackButton.module.scss';
import arrowLeft from '../../imgs/svg/arrow-left-icon.svg';

interface BackButtonProps {
  category: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ category }) => (
  <NavLink to={`/${category}`} className={styles.backButton}>
    <img className={styles.backButton__icon} src={arrowLeft} alt="arrow-left" />
    <span className={styles.backButton__text}>Back</span>
  </NavLink>
);
