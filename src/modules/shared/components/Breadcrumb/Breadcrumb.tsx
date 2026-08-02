import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../../../../assets/icons/Home.svg';
import styles from './Breadcrumb.module.scss';

export type BreadcrumbItem = {
    label: string;
    path: string;
};

export const Breadcrumb = () => {
    const location = useLocation();

    const segments = location.pathname.split('/').filter(Boolean);

    const crumbs: BreadcrumbItem[] = segments.reduce<BreadcrumbItem[]>(
        (acc, segment, index) => {
            const path = `/${segments.slice(0, index + 1).join('/')}`;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);

            return [...acc, { label, path }];
        },
        [],
    );

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

                    {crumbs.length > 0 && (
                        <span
                            className={styles.breadcrumb__separator}
                            aria-hidden="true"
                        >
                            &gt;
                        </span>
                    )}
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

                            {!isLast && (
                                <span
                                    className={styles.breadcrumb__separator}
                                    aria-hidden="true"
                                >
                                    &gt;
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
