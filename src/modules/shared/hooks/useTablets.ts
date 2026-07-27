import { useFetchList } from './useFetchList';
import { Device } from './types';

export const useTablets = () => {
    const { data, isLoading, error } =
        useFetchList<Device>('/api/tablets.json');

    return { tablets: data, isLoading, error };
};
