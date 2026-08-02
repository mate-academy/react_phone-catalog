import { useMemo } from 'react';
import { usePhones } from './usePhones';
import { useTablets } from './useTablets';
import { useAccessories } from './useAccessories';
import type { Device } from './types';

export const useProductDetails = (productId: string | undefined) => {
    const { phones, isLoading: isPhonesLoading } = usePhones();
    const { tablets, isLoading: isTabletsLoading } = useTablets();
    const { accessories, isLoading: isAccessoriesLoading } = useAccessories();

    const isLoading =
        isPhonesLoading || isTabletsLoading || isAccessoriesLoading;

    const allDevices = useMemo<Device[]>(
        () => [...phones, ...tablets, ...accessories],
        [phones, tablets, accessories],
    );

    const product = useMemo(
        () => allDevices.find(device => device.id === productId),
        [allDevices, productId],
    );

    const variants = useMemo(() => {
        if (!product) {
            return [];
        }

        return allDevices.filter(
            device => device.namespaceId === product.namespaceId,
        );
    }, [allDevices, product]);

    const notFound = !isLoading && !product;

    return { product, variants, isLoading, notFound };
};
