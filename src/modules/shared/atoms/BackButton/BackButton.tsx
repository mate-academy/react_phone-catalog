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
  category?: string;
};

export const BackButton: React.FC<Props> = ({ className, category }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (category) {
      navigate(`/${category}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={classNames(styles.back, className)}>
      <Button className={styles.back__button} fullHeight onClick={handleClick}>
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
