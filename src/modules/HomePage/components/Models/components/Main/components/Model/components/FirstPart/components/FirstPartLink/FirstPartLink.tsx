import React from 'react';
import styles from './FirstPartLink.module.scss';
import { ModelProps } from '../../../../types/ModelProps';

type PickedProps = Pick<ModelProps, 'name'>;

type Props = PickedProps & {
  firstPartProductTitle: string;
};

export const FirstPartLink: React.FC<Props> = React.memo(
  ({ firstPartProductTitle, name }) => {
    return (
      <a className={styles['product-title']} title={name}>
        {firstPartProductTitle}
      </a>
    );
  },
);

FirstPartLink.displayName = 'FirstPartLink';
