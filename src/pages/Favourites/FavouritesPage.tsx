import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useFavourites } from "@/store/FavouritesContext";
import { ProductsContext } from "@/store/ProductsContext";
import { useContext } from "react";

export const FavouritesPage: React.FC = () => {
  const { products } = useContext(ProductsContext);
  const { favourites } = useFavourites();

  const favouriteProducts = products.filter((p) =>
    favourites.includes(p.itemId)
  );
  const modelsAmount = favouriteProducts.length;

  return (
    <div className="px-6 xl:px-[152px] bg-[#FAFBFC]">
      <Breadcrumb />
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Favourites</h1>
        <p className="text-gray-400 text-[14px]">{modelsAmount} models</p>
      </div>

      {favouriteProducts.length === 0 ? (
        <p className="text-lg text-gray-500">
          You haven't added any products to favorites yet.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
