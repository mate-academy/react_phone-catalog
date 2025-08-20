import './favoritesPage.scss';
import { useContext, useEffect, useState } from 'react';
import { AllProductsType } from '../../types/AllProductsType';
import { BreadcrumbsNav } from '../BreadcrumbsNav';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
import { ProductCard } from '../ProductCard';

export const FavoritesPage = () => {
  const context = useContext(AddAndFavoritesContext);
  const { favorites } = context;

  const [products, setProducts] = useState<AllProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<AllProductsType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => setAllProducts(data));
  }, []);

  useEffect(() => {
    const productsInFavorites = allProducts.filter(product =>
      favorites.includes(product.id),
    );
    setProducts(productsInFavorites);
  }, [favorites, allProducts]);

  // console.log('--===productsInFavorites===--', products);
  // console.log('--===favorites===--', favorites);

  return (
    <div className="favorites-page">
      <BreadcrumbsNav />

      <div className="title-block">
        <div className="page-title">Favorites</div>
        <p className="main-body-text-14">{favorites.length} items</p>
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
