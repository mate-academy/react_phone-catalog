import React, { useEffect, useState } from 'react';
import style from './FavoritesPage.module.scss';
import { Link } from 'react-router-dom';
import { useLikeProducts } from '../../context/LikeCard';
import { Product, ProductCategory } from '../../types/Product';
import { client } from '../../client';
import { ProductCard } from '../../components/ProductCard';

export const FavoritesPage: React.FC = () => {
  const { inden } = useLikeProducts();
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const categories: ProductCategory[] = [
        'phones',
        'tablets',
        'accessories',
        'products',
      ];

      const allProductsArray = await Promise.all(
        categories.map(cat => client.getProducts(cat)),
      );

      const merged = allProductsArray.flat();

      setProducts(merged);
    };

    load();
  }, []);

  const favoriteProduct = products?.filter(pr => inden.has(pr.id)) || [];

  return (
    <div className={style.section}>
      <div className={style.topNavDetails}>
        <Link to="/">
          <img src="img/buttons/home_button.svg" alt="Link Home" />
        </Link>
        <img src="img/arrows/arrow_right_gray.svg" alt="button right" />
        <p className={style.nameNav}>Favorites</p>
      </div>

      <div>
        <h2 className={style.forH}>Favorites</h2>
        {favoriteProduct.length === 0 ? (
          <img
            src="img/product-not-found.png"
            alt="No favories yet"
            className={style.emptyImg}
          />
        ) : (
          <div className={style.lengthItems}>
            {favoriteProduct.length} items
          </div>
        )}
      </div>

      <div className={style.productLength}>
        {favoriteProduct?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
