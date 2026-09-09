import { ProductsPage } from '../ProductsPage';

// три страницы каталога отличаются только категорией — вся логика в ProductsPage
export const PhonesPage = () => <ProductsPage category="phones" />;
