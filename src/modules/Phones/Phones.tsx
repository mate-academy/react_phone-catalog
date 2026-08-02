import { CatalogPage } from '../shared/components/CatalogPage';
import { usePhones } from '../shared/hooks';

export const Phones = () => {
    const { phones } = usePhones();

    return <CatalogPage title="Mobile phones" items={phones} />;
};
