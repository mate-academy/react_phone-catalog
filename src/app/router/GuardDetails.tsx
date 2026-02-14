import { Outlet, useParams } from "react-router-dom";
import { ProductNotFoundPage } from "../../modules/ProductNotFoundPage";
import { useEffect, useState } from "react";
import type { ProductDetails } from "../../modules/shared/types/ProductDetails";
import { getProductById } from "../../utils/api/product";
import { Spinner } from "../../modules/shared/components/Spinner";

type Params = {
  categoryName: string;
  productId: string;
};

export const GuardDetails = () => {
  const { productId, categoryName } = useParams<Params>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId || !categoryName) return;

    const load = async () => {
      if (firstLoad) {
        setLoading(true);

        const [fetchedProduct] = await Promise.all([
          getProductById(productId, categoryName),
          new Promise((resolve) => setTimeout(resolve, 400)),
        ]);

        setProduct(fetchedProduct);
        setLoading(false);
        setFirstLoad(false);
      } else {
        const fetchedProduct = await getProductById(productId, categoryName);
        setProduct(fetchedProduct);
      }
    };

    load();
  }, [productId, categoryName]);

  if (loading) {
    return <Spinner />;
  }

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return <Outlet context={{ product }} />;
};
