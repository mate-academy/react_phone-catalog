import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../../../../assets/icons/Home.svg';
import styles from './Breadcrumb.module.scss';

const CHEVRON_RIGHT_PATH = `M5.52876 3.52861C5.78911 3.26826 6.21122 3.26826 6.47157 3.52861L10.4716 7.52861C10.7319 7.78896 10.7319 8.21107 10.4716 8.47141L6.47157 12.4714C6.21122 12.7318 5.78911 12.7318 5.52876 12.4714C5.26841 12.2111 5.26841 11.789 5.52876 11.5286L9.05735 8.00001L5.52876 4.47141C5.26841 4.21107 5.26841 3.78896 5.52876 3.52861Z`;

export type BreadcrumbItem = {
    label: string;
    path: string;
};

const BreadcrumbSeparator = () => (
    <svg
        className={styles.breadcrumb__separator}
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={CHEVRON_RIGHT_PATH}
            fill="currentColor"
        />
    </svg>
);

export interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
    const location = useLocation();

    const segments = location.pathname.split('/').filter(Boolean);

    const autoCrumbs: BreadcrumbItem[] = segments.reduce<BreadcrumbItem[]>(
        (acc, segment, index) => {
            const path = `/${segments.slice(0, index + 1).join('/')}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);

            return [...acc, { label, path }];
        },
        [],
    );

    const crumbs = items ?? autoCrumbs;

    return (
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol className={styles.breadcrumb__list}>
                <li className={styles.breadcrumb__item}>
                    <Link
                        to="/"
                        className={styles.breadcrumb__link}
                        aria-label="Home"
                    >
                        <img
                            src={homeIcon}
                            alt=""
                            aria-hidden="true"
                            className={styles.breadcrumb__homeIcon}
                        />
                    </Link>

                    {crumbs.length > 0 && <BreadcrumbSeparator />}
                </li>

                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;

                    return (
                        <li
                            key={crumb.path}
                            className={styles.breadcrumb__item}
                        >
                            {isLast ? (
                                <span
                                    className={styles.breadcrumb__current}
                                    aria-current="page"
                                >
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    to={crumb.path}
                                    className={styles.breadcrumb__link}
                                >
                                    {crumb.label}
                                </Link>
                            )}

                            {!isLast && <BreadcrumbSeparator />}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
