import { Category } from '../Category';
import './CategoriesList.scss';

export const CategoriesList = () => (
  <div
    className="CategoriesList"
    data-cy="categoryLinksContainer"
  >
    <Category name="phones" title="Mobile phones" amount={95} />
    <Category name="tablets" title="Tablets" amount={24} />
    <Category name="accessories" title="Accessories" amount={100} />
  </div>
);
