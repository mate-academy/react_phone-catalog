import { CatalogPage } from '../shared/components/CatalogPage';
import { useTablets } from '../shared/hooks';

export const Tablets = () => {
    const { tablets } = useTablets();

    return <CatalogPage title="Tablets" items={tablets} />;
};
