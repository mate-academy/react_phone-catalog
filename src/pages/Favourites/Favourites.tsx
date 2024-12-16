import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard';
import './Favourites.scss';

export const Favourites = () => {
  return (
    <div className="favourites">
      <Breadcrumbs paths={['Favourites']} />

      <h1 className="favourites__title">Favourites</h1>
      <p className="favourites__subtitle body-text">5 items</p>

      <div className="favourites__container">
        <ProductCard wideButton={true} />
        <ProductCard wideButton={true} />
        <ProductCard wideButton={true} />
        <ProductCard wideButton={true} />
        <ProductCard wideButton={true} />
        <ProductCard wideButton={true} />
      </div>
    </div>
  );
};
