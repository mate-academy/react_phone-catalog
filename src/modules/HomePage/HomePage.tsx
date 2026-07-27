import { ProductGallery } from '../shared/components/ProductGallery';
import { ShopByCategory } from '../shared/components/ShopByCategory';
import {
    useAccessories,
    usePhones,
    useProducts,
    useTablets,
} from '../shared/hooks';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import phoneImage from '../../assets/img/phones.png';
import tabletImage from '../../assets/img/tablet.png';
import accessoryImage from '../../assets/img/accessories.png';

export const HomePage = () => {
    const { products, isLoading, error } = useProducts();
    const { phones } = usePhones();
    const { tablets } = useTablets();
    const { accessories } = useAccessories();
    const brandNewModels = products.filter(
        product =>
            product.name.includes('iPhone 14') ||
            product.name.includes('iPhone 13'),
    );
    const hotPriceModels = [...products]
        .filter(
            product =>
                product.fullPrice > product.price &&
                !product.name.includes('iPhone 14') &&
                !product.name.includes('iPhone 13'),
        )
        .sort(
            (firstProduct, secondProduct) =>
                secondProduct.fullPrice -
                secondProduct.price -
                (firstProduct.fullPrice - firstProduct.price),
        );
    const categoryItems = [
        {
            id: 'phones',
            title: 'Mobile phones',
            to: '/phones',
            image: phoneImage,
            itemCount: phones.length,
        },
        {
            id: 'tablets',
            title: 'Tablets',
            to: '/tablets',
            image: tabletImage,
            itemCount: tablets.length,
        },
        {
            id: 'accessories',
            title: 'Accessories',
            to: '/accessories',
            image: accessoryImage,
            itemCount: accessories.length,
        },
    ];

    return (
        <section className={styles.homePage}>
            <h1 className={styles.homePage__title__hidden}>Product Catalog</h1>
            <header className={styles.homePage__header}>
                <h2 className={styles.homePage__header__title}>
                    Welcome to Nice Gadgets store!
                </h2>
            </header>
            <PicturesSlider />

            {isLoading && <p>Loading products...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && (
                <>
                    <ProductGallery
                        title="Brand new models"
                        products={brandNewModels}
                        showFullPrice={false}
                    />
                    <ShopByCategory
                        title="Shop by category"
                        categories={categoryItems}
                    />
                    <ProductGallery
                        title="Hot prices"
                        products={hotPriceModels}
                    />
                </>
            )}
        </section>
    );
};
