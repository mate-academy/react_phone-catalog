import { ArrowIcon } from '@shared/icons';
import { Breadcrumbs } from '@ui/index';
import styles from '../../styles/headSection.module.scss';

type Props = {
  breadcrumbs: {
    links: {
      name: string;
      to: string;
    }[];
  };
  onButton: () => void;
  name: string;
};

export const HeadSection = ({ breadcrumbs, onButton, name }: Props) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <Breadcrumbs {...breadcrumbs} />
      </nav>
      <button className={styles['return-button']} onClick={onButton}>
        <ArrowIcon direction="left" />
        Back
      </button>
      <h1 className={styles.h1}>{name}</h1>
    </>
  );
};
