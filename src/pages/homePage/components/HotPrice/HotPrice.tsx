import { useEffect, useMemo, useState } from "react";
import { IProductCard } from "../../../../interfaces/ProductCard.interface";
import { ProductService } from "../../../../services/product.service";
import ProductsSlider from "../../../../shared/ProductsSlider";

const HotPrice = () => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [error, setError] = useState<string>('');

  const productsWithHotPrice = useMemo(() => {
    return [...products].sort((a, b) => b.fullPrice - a.fullPrice);
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
        products={productsWithHotPrice}
        title="Hot prices"
      />
    )
  );
};

export default HotPrice;
