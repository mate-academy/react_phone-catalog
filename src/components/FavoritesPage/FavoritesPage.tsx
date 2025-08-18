import { useContext, useEffect, useState } from 'react';
import { AllProductsType } from '../../types/AllProductsType';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { AddAndFavouritesContext } from '../contexts/AddAndFavouriteContext';
import { ProductCard } from '../ProductCard';
import './favoritesPage.scss';

export const FavoritesPage = () => {
  const context = useContext(AddAndFavouritesContext);

  const [products, setProducts] = useState<AllProductsType[]>([]);

  const { favourites } = context;

  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInFavorites = allProducts.filter(product =>
      favourites.includes(product.id),
    );
    setProducts(productsInFavorites);
  }, [favourites, allProducts]);

  console.log('--===productsInFavorites===--', products);
  console.log('--===favourites===--', favourites);

  return (
    <div className="favourites-page">
      <BreadcrumbsNav />

      <div className="title-block">
        <div className="page-title">Favorites</div>
        <p className="main-body-text-14">{favourites.length} models</p>
      </div>

      <div className="category-models">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={product.year < 2021}
          />
        ))}
      </div>
    </div>
  );
};
