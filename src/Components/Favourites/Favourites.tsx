import { useContext, useEffect } from 'react';
import './Favourites.scss';
import { ProductContext } from '../../contexts/ProductContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { BackLink } from '../BackLink/BackLink';

export const Favourites = () => {
  const { favouriteProducts, setFavouriteProducts } = useContext(ProductContext);

  useEffect(() => {
    console.log('UseEffect favourites works');
    // Извлечение избранных из localStorage при монтировании компонента
    const storedFavorites = localStorage.getItem('favouriteProducts');

    if (storedFavorites) {
      setFavouriteProducts(JSON.parse(storedFavorites));
    }
  }, [setFavouriteProducts]);

  return (
    <div className="favourites">
      <BackLink text="Favourites" />
      <h1 className="favourites__title">Favourites</h1>
      <h2 className="favourites__subtitle">{`${favouriteProducts.length} items`}</h2>
      <div className="favourites-container">
        {favouriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
