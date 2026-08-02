import { useFetchList } from './useFetchList';

type RawProduct = {
    id: number;
    category: string;
    itemId: string;
    name: string;
    fullPrice: number;
    price: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    image: string;
};

export type Product = {
    id: number;
    category: string;
    itemId: string;
    name: string;
    priceRegular: number;
    priceDiscount: number;
    screen: string;
    capacity: string;
    color: string;
    ram: string;
    year: number;
    images: string[];
};

export const useProducts = () => {
    const { data, isLoading, error } =
        useFetchList<RawProduct>('/api/products.json');
    const products: Product[] = data.map(product => ({
        id: product.id,
        category: product.category,
        itemId: product.itemId,
        name: product.name,
        priceRegular: product.fullPrice,
        priceDiscount: product.price,
        screen: product.screen,
        capacity: product.capacity,
        color: product.color,
        ram: product.ram,
        year: product.year,
        // Keep the lightweight catalog shape aligned with detailed product data.
        images: [product.image],
    }));

    return { products, isLoading, error };
};
