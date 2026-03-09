/* eslint max-len: "off" */
/* eslint-disable @typescript-eslint/indent */
import './FavouritesPage.scss';
import { Breadcrumbs } from '../ProductsPage/Breadcrumbs';
import { ProductCard } from '../HomePage/ProductCard';
import { useContext, useEffect, useState } from 'react';
import { CartAndFavouritesContext } from '../../components/context/CartAndFavouritesContext';
import { ProductsType } from '../../types/ProductsType';
import { SkeletonProductCard } from '../../components/Skeletons/SkeletonProductCard/SkeletonProductCard';

export const FavouritesPage = () => {
  const context = useContext(CartAndFavouritesContext);
  const { favourites } = context;

  const [products, setProducts] = useState<ProductsType[]>([]);
  const [allProducts, setAllProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: ProductsType[]) => {
        setAllProducts(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const productsInFavourites = allProducts.filter(product =>
      favourites.includes(product.id),
    );

    setProducts(productsInFavourites);
  }, [favourites, allProducts]);

  return (
    <div className="favourites">
      <Breadcrumbs />

      <div className="favourites__title">
        <h2 className="favourites__title--text">Favourites</h2>
        <p className="favourites__title--count">{favourites.length} items</p>
      </div>

      <div className="favourites__models">
        {isLoading
          ? Array.from({ length: favourites.length }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))
          : products.map(product => (
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
