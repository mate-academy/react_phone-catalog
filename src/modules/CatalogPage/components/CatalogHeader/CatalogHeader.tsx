import { FC } from 'react';
import { Path } from '../../../shared/components/Path';
import styles from './CatalogHeader.module.scss';

type Props = {
  pathName: string;
};
export const CatalogHeader: FC<Props> = ({ pathName }) => {
  return (
    <>
      <Path pathName={pathName} />
    </>
  );
};
