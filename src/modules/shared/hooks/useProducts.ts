import { useFetchList } from './useFetchList';

export type Product = {
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

export const useProducts = () => {
    const { data, isLoading, error } =
        useFetchList<Product>('/api/products.json');

    return { products: data, isLoading, error };
};
