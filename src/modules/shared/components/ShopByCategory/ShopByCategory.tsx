import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export type ShopCategoryItem = {
    id: string;
    title: string;
    to: string;
    image: string;
    itemCount: number;
};

export interface ShopByCategoryProps {
    title: string;
    categories: ShopCategoryItem[];
}

export const ShopByCategory = ({ title, categories }: ShopByCategoryProps) => {
    return (
        <section className={styles.shopByCategory}>
            <h2 className={styles.shopByCategory__title}>{title}</h2>

            <div className={styles.shopByCategory__grid}>
                {categories.map(category => (
                    <article
                        key={category.id}
                        className={styles.shopByCategory__card}
                    >
                        <Link
                            to={category.to}
                            className={styles.shopByCategory__imageLink}
                            aria-label={`Open ${category.title}`}
                        >
                            <img
                                className={styles.shopByCategory__image}
                                src={category.image}
                                alt={category.title}
                            />
                        </Link>

                        <h3 className={styles.shopByCategory__cardTitle}>
                            {category.title}
                        </h3>

                        <p className={styles.shopByCategory__count}>
                            {category.itemCount} models
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
};
