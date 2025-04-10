import { Product } from "@/types/Product";
import { ProductsSlider } from "../ProductsSlider";

export const BrandNewSlider = () => {
    const sortByModelNumber = (a: Product, b: Product) => {
      const getModelNumber = (id: string) => {
        const match = id.match(/iphone-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      };
  
      return getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId);
    };

    return (
      <ProductsSlider
        title="Brand new models"
        sortFunction={sortByModelNumber}
      />
    );
  };