import { useFetchList } from './useFetchList';
import { Device } from './types';

export const useAccessories = () => {
    const { data, isLoading, error } = useFetchList<Device>(
        '/api/accessories.json',
    );

    return { accessories: data, isLoading, error };
};
