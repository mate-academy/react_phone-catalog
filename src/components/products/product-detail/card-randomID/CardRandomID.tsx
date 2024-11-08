import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useRandomID } from '@hooks/useRandomID';

import styles from './CardRandomID.module.scss';

type TProps = {
  itemId: string | undefined;
};

export const CardRandomID: FC<TProps> = ({ itemId }) => {
  const randomID = useRandomID(itemId);
  const { t } = useTranslation();
  const localID = t('product.id');

  return (
    <div className={styles.ids} aria-label={localID}>
      ID: {randomID}
    </div>
  );
};
