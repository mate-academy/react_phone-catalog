import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProductDetails, useProducts, useShopState } from '../shared/hooks';
import { Breadcrumb } from '../shared/components/Breadcrumb';
import { Loader } from '../shared/components/Loader';
import { ProductGallery } from '../shared/components/ProductGallery';
import { getSuggestedProducts } from '../shared/utils/getSuggestedProducts';
import { getColorHex } from '../shared/utils/colorHexMap';
import { getPublicPath } from '../shared/utils/getPublicPath';
import chevronLeftIcon from '../../assets/icons/Chevron-Left.svg';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_PATHS: Record<string, string> = {
    phones: '/phones',
    tablets: '/tablets',
    accessories: '/accessories',
};

const TECH_SPEC_ROWS = [
    { label: 'Screen', key: 'screen' },
    { label: 'Resolution', key: 'resolution' },
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Built in memory', key: 'capacity' },
    { label: 'Camera', key: 'camera' },
    { label: 'Zoom', key: 'zoom' },
] as const;

export const ProductDetailsPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { product, variants, isLoading, notFound } =
        useProductDetails(productId);
    const { products } = useProducts();
    const { favoriteIds, isInCart, toggleFavorite, addToCart } = useShopState();
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        setSelectedImage(0);
    }, [productId]);

    const suggestedProducts = useMemo(() => {
        if (!productId) {
            return [];
        }

        return getSuggestedProducts(products, productId);
    }, [products, productId]);

    if (isLoading) {
        return <Loader />;
    }

    if (notFound || !product) {
        return (
            <section className={styles.productDetailsPage}>
                <h1 className={styles.productDetailsPage__notFound}>
                    Product was not found
                </h1>
                <Link
                    to="/"
                    className={styles.productDetailsPage__notFoundLink}
                >
                    Go to Home
                </Link>
            </section>
        );
    }

    const categoryLabel =
        product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const categoryPath = CATEGORY_PATHS[product.category] ?? '/';

    const handleColorSelect = (color: string) => {
        const target = variants.find(
            variant =>
                variant.capacity === product.capacity &&
                variant.color === color,
        );

        if (target) {
            navigate(`/product/${target.id}`);
        }
    };

    const handleCapacitySelect = (capacity: string) => {
        const target = variants.find(
            variant =>
                variant.capacity === capacity &&
                variant.color === product.color,
        );

        if (target) {
            navigate(`/product/${target.id}`);
        }
    };

    const isFavorite = favoriteIds.includes(product.id);
    const productIsInCart = isInCart(product.id);

    return (
        <section className={styles.productDetailsPage}>
            <Breadcrumb
                items={[
                    { label: categoryLabel, path: categoryPath },
                    { label: product.name, path: `/product/${product.id}` },
                ]}
            />

            <button
                type="button"
                className={styles.productDetailsPage__back}
                onClick={() => navigate(-1)}
            >
                <img
                    src={chevronLeftIcon}
                    alt=""
                    aria-hidden="true"
                    className={styles.productDetailsPage__backIcon}
                />
                <span>Back</span>
            </button>

            <h1 className={styles.productDetailsPage__title}>{product.name}</h1>

            <div className={styles.productDetailsPage__top}>
                <div className={styles.productDetailsPage__gallery}>
                    <div className={styles.productDetailsPage__thumbnails}>
                        {product.images.map((image, index) => (
                            <button
                                key={image}
                                type="button"
                                className={
                                    styles.productDetailsPage__thumbnailButton
                                }
                                onClick={() => setSelectedImage(index)}
                                aria-label={`Show picture ${index + 1}`}
                                aria-current={selectedImage === index}
                            >
                                <img
                                    src={getPublicPath(image)}
                                    alt={`${product.name} ${index + 1}`}
                                    className={
                                        styles.productDetailsPage__thumbnail
                                    }
                                />
                            </button>
                        ))}
                    </div>

                    <img
                        src={getPublicPath(
                            product.images[selectedImage] ?? product.images[0],
                        )}
                        alt={product.name}
                        className={styles.productDetailsPage__mainImage}
                    />
                </div>

                <div className={styles.productDetailsPage__info}>
                    <div>
                        <p className={styles.productDetailsPage__label}>
                            Available colors
                        </p>

                        <div className={styles.productDetailsPage__colors}>
                            {product.colorsAvailable.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    className={
                                        styles.productDetailsPage__colorSwatch
                                    }
                                    style={{
                                        backgroundColor: getColorHex(color),
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                    aria-label={color}
                                    aria-pressed={color === product.color}
                                    data-selected={color === product.color}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className={styles.productDetailsPage__label}>
                            Select capacity
                        </p>

                        <div className={styles.productDetailsPage__capacities}>
                            {product.capacityAvailable.map(capacity => (
                                <button
                                    key={capacity}
                                    type="button"
                                    className={
                                        styles.productDetailsPage__capacityBtn
                                    }
                                    onClick={() =>
                                        handleCapacitySelect(capacity)
                                    }
                                    aria-pressed={capacity === product.capacity}
                                    data-selected={
                                        capacity === product.capacity
                                    }
                                >
                                    {capacity}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.productDetailsPage__prices}>
                        <span className={styles.productDetailsPage__price}>
                            ${product.priceDiscount}
                        </span>
                        <span className={styles.productDetailsPage__fullPrice}>
                            ${product.priceRegular}
                        </span>
                    </div>

                    <div className={styles.productDetailsPage__actions}>
                        <button
                            type="button"
                            className={styles.productDetailsPage__addToCart}
                            onClick={() => addToCart(product.id)}
                            disabled={productIsInCart}
                        >
                            {productIsInCart ? 'Added to cart' : 'Add to cart'}
                        </button>

                        <button
                            type="button"
                            className={styles.productDetailsPage__favorite}
                            onClick={() => toggleFavorite(product.id)}
                            aria-label={
                                isFavorite
                                    ? 'Remove from favorites'
                                    : 'Add to favorites'
                            }
                            data-active={isFavorite}
                        >
                            &hearts;
                        </button>
                    </div>

                    <dl className={styles.productDetailsPage__miniSpecs}>
                        <div className={styles.productDetailsPage__specRow}>
                            <dt>Screen</dt>
                            <dd>{product.screen}</dd>
                        </div>
                        <div className={styles.productDetailsPage__specRow}>
                            <dt>Resolution</dt>
                            <dd>{product.resolution}</dd>
                        </div>
                        <div className={styles.productDetailsPage__specRow}>
                            <dt>Processor</dt>
                            <dd>{product.processor}</dd>
                        </div>
                        <div className={styles.productDetailsPage__specRow}>
                            <dt>RAM</dt>
                            <dd>{product.ram}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div className={styles.productDetailsPage__content}>
                <div className={styles.productDetailsPage__about}>
                    <h2 className={styles.productDetailsPage__sectionTitle}>
                        About
                    </h2>

                    {product.description.map(section => (
                        <div key={section.title}>
                            <h3
                                className={
                                    styles.productDetailsPage__aboutSubheader
                                }
                            >
                                {section.title}
                            </h3>

                            {section.text.map(paragraph => (
                                <p
                                    key={paragraph}
                                    className={
                                        styles.productDetailsPage__aboutText
                                    }
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={styles.productDetailsPage__techSpecs}>
                    <h2 className={styles.productDetailsPage__sectionTitle}>
                        Tech specs
                    </h2>

                    <dl className={styles.productDetailsPage__specList}>
                        {TECH_SPEC_ROWS.map(({ label, key }) => {
                            const value = product[key];

                            if (!value) {
                                return null;
                            }

                            return (
                                <div
                                    key={key}
                                    className={
                                        styles.productDetailsPage__specRow
                                    }
                                >
                                    <dt>{label}</dt>
                                    <dd>{value}</dd>
                                </div>
                            );
                        })}

                        <div className={styles.productDetailsPage__specRow}>
                            <dt>Cell</dt>
                            <dd>{product.cell.join(', ')}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {suggestedProducts.length > 0 && (
                <ProductGallery
                    title="You may also like"
                    products={suggestedProducts}
                />
            )}
        </section>
    );
};
