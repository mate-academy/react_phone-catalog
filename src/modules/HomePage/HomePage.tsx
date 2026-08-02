import { ProductGallery } from '../shared/components/ProductGallery';
import { ShopByCategory } from '../shared/components/ShopByCategory';
import {
    useAccessories,
    usePhones,
    useTablets,
    type Device,
    type Product,
} from '../shared/hooks';
import styles from './HomePage.module.scss';
import { PicturesSlider } from './components/PicturesSlider/PicturesSlider';
import phoneImage from '../../assets/img/phones.png';
import tabletImage from '../../assets/img/tablet.png';
import accessoryImage from '../../assets/img/accessories.png';

const mapDeviceToProduct = (device: Device): Product => ({
    id: Number(device.id.replace(/\D/g, '')) || 0,
    category: device.category,
    itemId: device.id,
    name: device.name,
    fullPrice: device.priceRegular,
    price: device.priceDiscount,
    screen: device.screen,
    capacity: device.capacity,
    color: device.color,
    ram: device.ram,
    year: 0,
    image: device.images[0],
});

export const HomePage = () => {
    const {
        phones,
        isLoading: isPhonesLoading,
        error: phonesError,
    } = usePhones();
    const {
        tablets,
        isLoading: isTabletsLoading,
        error: tabletsError,
    } = useTablets();
    const {
        accessories,
        isLoading: isAccessoriesLoading,
        error: accessoriesError,
    } = useAccessories();
    const allDevices = [...phones, ...tablets, ...accessories];
    const isLoading =
        isPhonesLoading || isTabletsLoading || isAccessoriesLoading;
    const error = phonesError || tabletsError || accessoriesError;
    const brandNewModels = allDevices
        .filter(
            product =>
                product.name.includes('iPhone 14') ||
                product.name.includes('iPhone 13'),
        )
        .map(mapDeviceToProduct);
    const hotPriceModels = [...allDevices]
        .filter(
            product =>
                product.priceRegular > product.priceDiscount &&
                !product.name.includes('iPhone 14') &&
                !product.name.includes('iPhone 13'),
        )
        .sort(
            (firstProduct, secondProduct) =>
                secondProduct.priceRegular -
                secondProduct.priceDiscount -
                (firstProduct.priceRegular - firstProduct.priceDiscount),
        )
        .map(mapDeviceToProduct);
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
