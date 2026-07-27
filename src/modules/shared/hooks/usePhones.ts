import { useFetchList } from './useFetchList';
import { Device } from './types';

export const usePhones = () => {
    const { data, isLoading, error } = useFetchList<Device>('/api/phones.json');

    return { phones: data, isLoading, error };
};
