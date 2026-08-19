import { useEffect, useMemo, useState } from "react";
import { IProductCard } from "../../../../interfaces/ProductCard.interface";
import { ProductService } from "../../../../services/product.service";
import ProductsSlider from "../../../../shared/ProductsSlider";

const NewModelsSlider = () => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [error, setError] = useState<string>('');

  const newProducts = useMemo(() => {
    return [...products].filter(product => product.year === 2022);
  }, [products]);

  useEffect(() => {
    const fetchData = async () => {
      setError('');

      try {
        const data = await ProductService.getAll();

        if (data) {
          setProducts(data);
        }
      } catch(err) {
        setError('Products not found');
      }
    };

    fetchData();
  }, []);

  return (
    !error && (
      <ProductsSlider
        products={newProducts}
        title="Brand new models"
      />
    )
  );
};

export default NewModelsSlider;
