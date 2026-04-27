import React from 'react';
import styles from './BackButton.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ArrowIcon } from '../../../../assets/icons/arrow-icon';
import { Typography } from '../Typography';
import { useTranslation } from 'react-i18next';

type Props = {
  className?: string;
};

export const BackButton: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.back, className)}>
      <Button
        className={styles.back__button}
        fullHeight
        onClick={() => navigate(-1)}
      >
        <Typography
          className={classNames(styles.hover_effect, styles.back__text)}
          variant="small"
        >
          <Icon color="inherit">
            <ArrowIcon />
          </Icon>
          {t('buttons.actions.back')}
        </Typography>
      </Button>
    </div>
  );
};
