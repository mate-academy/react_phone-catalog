import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ProductCard } from '../../components/ProductCard';
import { getProductsById } from '../../services/Products';
import { Product } from '../../types/Product';
import '../../styles/utils/typography.scss';
import './FavouritePage.scss';
import { BreadCrumb } from '../../components/BreadCrumb';

export const FavouritePage = () => {
  const favouriteIds: string[] = useAppSelector(state => state.favourite.items);
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFavouriteProducts = async () => {
      const favProducts = await getProductsById(favouriteIds);

      setFavouriteProducts(favProducts);
    };

    fetchFavouriteProducts();
  }, [favouriteIds]);

  return (
    <div className="favourites">
      <div className="favourites__title-wrapper">
        <div className="favourites__bread-crumb">
          <BreadCrumb />
        </div>
        <h1 className="title">Favourites</h1>
        <p className="paragraph favourites__subtitle">
          {favouriteProducts.length} items
        </p>
      </div>
      <div className="favourites__list">
        {favouriteProducts.map(product => (
          <div className="favourites__item" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
