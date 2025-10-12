import { Breadcrumbs, ReturnButton } from '@ui/index';
import styles from '../../styles/headSection.module.scss';

type Props = {
  breadcrumbs: {
    links: {
      name: string;
      to: string;
    }[];
  };
  name: string;
};

export const HeadSection = ({ breadcrumbs, name }: Props) => {
  return (
    <>
      <nav aria-label="breadcrumb">
        <Breadcrumbs {...breadcrumbs} />
      </nav>
      <ReturnButton />
      <h1 className={styles.h1}>{name}</h1>
    </>
  );
};
