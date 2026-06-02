/* eslint-disable prettier/prettier */

import { useNavigate } from 'react-router-dom';

import arrowLeft from '@/assets/svg/arrow-left.svg';

import styles from './BackButton.module.scss';

const { backButton, backButtonBtn, backButtonIcon, backButtonText } = styles;

export const BackButton = () => {
  const navigate = useNavigate();
  const navigateBack = () => navigate(-1);

  return (
    <div className={backButton}>
      <button className={backButtonBtn} type="button" onClick={navigateBack}>
        <div className={backButtonIcon}>
          <img src={arrowLeft} alt="Back" />
        </div>
        <span className={backButtonText}>Back</span>
      </button>
    </div>
  );
};
