import { useEffect, useMemo, useState } from "react";
import { IProductCard } from "../../../../interfaces/ProductCard.interface";
import { ProductService } from "../../../../services/product.service";
import ProductsSlider from "../../../../shared/ProductsSlider";

const NewModelsSlider = () => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  
  const newProducts = useMemo(() => {
    return [...products].filter(product => product.year === 2022);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductService.getAll();

        if (data) {
          setProducts(data);
        }
      } catch(error) {
        console.error('Products not found:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ProductsSlider 
      products={newProducts} 
      title="Brand new models"
    />
  )
}

export default NewModelsSlider;
