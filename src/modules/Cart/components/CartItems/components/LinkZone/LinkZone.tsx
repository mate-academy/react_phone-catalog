/* eslint-disable max-len */
import React from 'react';

import { FirstPartLink as Link } from '../../../../../HomePage/components/Models/components/Main/components/Model/components/FirstPart/components/FirstPartLink';
import styles from './LinkZone.module.scss';

interface Props {
  onClickHandler: () => void;
  title: string;
  image: string;
}

export const LinkZone: React.FC<Props> = React.memo(props => {
  const { onClickHandler, image, title } = props;

  return (
    <div style={{ display: 'contents' }} onClick={onClickHandler}>
      <img src={`/${image}`} alt={title} className={styles.img} />
      <div className={styles['title-wrapper']}>
        <Link productTitle={title} name={title} />
      </div>
    </div>
  );
});

LinkZone.displayName = 'LinkZone';
