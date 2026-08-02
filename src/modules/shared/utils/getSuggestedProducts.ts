import type { Product } from '../hooks';

const DEFAULT_SUGGESTED_COUNT = 8;

export const getSuggestedProducts = (
    products: Product[],
    currentProductSlug: string,
    count = DEFAULT_SUGGESTED_COUNT,
): Product[] => {
    const candidates = products.filter(
        product => product.itemId !== currentProductSlug,
    );

    const shuffled = [...candidates].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count);
};
