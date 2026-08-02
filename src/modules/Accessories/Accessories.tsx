import { CatalogPage } from '../shared/components/CatalogPage';
import { useAccessories } from '../shared/hooks';

export const Accessories = () => {
    const { accessories } = useAccessories();

    return <CatalogPage title="Accessories" items={accessories} />;
};
