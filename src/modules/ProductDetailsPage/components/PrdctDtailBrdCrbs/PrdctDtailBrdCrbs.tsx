import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import styles from './PrdctDtailBrdCrbs.module.scss';
import { BREADCRUMB_LABELS } from '../../../shared/constants/BREADCRUMB_LABELS';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  productName: string | null;
}

export const PrdctDtailBrdCrbs: React.FC<Props> = ({ productName }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const breadcrumbsKey = location.pathname.split('/');
  const breadcrumbsLabel =
    BREADCRUMB_LABELS[breadcrumbsKey[1]] ?? breadcrumbsKey;
  return (
    <Breadcrumbs
      items={[
        { label: t(breadcrumbsLabel), to: breadcrumbsKey[1] },
        { label: productName || '...' },
      ]}
      classNames={styles.breadcrumbs}
    />
  );
};
