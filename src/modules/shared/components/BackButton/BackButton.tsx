import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@components/IconButton';
import { IconButtonType } from '@sTypes/IconButtonType';
import { useAppSelector } from '@store/hooks';
import { Theme } from '@sTypes/Theme';

import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const theme = useAppSelector(state => state.theme);

  return (
    <button
      className={classNames(styles['back-button'], {
        [styles['back-button--dark']]: theme === Theme.dark,
      })}
      onClick={() => navigate(-1)}
    >
      <IconButton
        icon
        type={IconButtonType.arrowLeft}
        small
        hideBorders
        hideBackground
        className={styles['back-button__arrow']}
      />

      <div className={styles['back-button__text']}>Back</div>
    </button>
  );
};
