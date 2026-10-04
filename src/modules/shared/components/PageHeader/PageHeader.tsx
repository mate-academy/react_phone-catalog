import { Breadcrumbs, BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs';
import styles from './PageHeader.module.scss';

interface Props {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ breadcrumbs, title, subtitle }: Props) => (
  <header className={styles.header}>
    <Breadcrumbs items={breadcrumbs} />
    <h1 className={styles.title}>{title}</h1>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </header>
);
