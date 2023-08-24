import React from 'react';
import { useTranslation } from 'react-i18next';

import { MainButton } from '../Buttons/MainButton/MainButton';

import './ErrorMessage.scss';

type Props = {
  rootClassName: string,
  reload: () => void,
};

export const ErrorMessage: React.FC<Props> = React.memo(({
  rootClassName,
  reload,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${rootClassName}-error-container grid`}>
      <p className={`${rootClassName}-error-text`}>
        {t('Later')}
      </p>

      <MainButton
        className={`${rootClassName}-error-button`}
        button
        text={t('LaterButton')}
        onClick={reload}
      />
    </div>
  );
});
