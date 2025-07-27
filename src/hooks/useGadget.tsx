import { useEffect, useState } from 'react';
import { helperToFindProductsByCategory } from '../utils/helperToFindProductsByCategory';
import { getProduct } from '../api/fetchProducts';
import { helperToFindMayLikeProducts } from '../utils/helperToFindMayLikeProduct';
import { useParams } from 'react-router-dom';
import type { Gadget } from '../types/gadgets';
import type { Product } from '../types/products';

export const useGadget = () => {
  const { category, itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [gadget, setGadget] = useState<Gadget | null>(null);
  const [gadgets, setGadgets] = useState<Gadget[]>([]);
  const [productsMayLike, setProductsMayLike] = useState<Product[]>([]);

  useEffect(() => {
    if (!category || !itemId) {
      setLoading(false);
      return;
    }

    helperToFindProductsByCategory(category)
      .then((gadgets) => {
        const foundGadget = gadgets.find((gadget) => gadget.id === itemId);
        setGadget(foundGadget ?? null);
        const filteredByMayLike = gadgets.filter(
          (item) => item.namespaceId === gadget?.namespaceId,
        );
        setGadgets(filteredByMayLike);
      })
      .finally(() => setLoading(false));
  }, [category, gadget?.namespaceId, itemId]);

  useEffect(() => {
    getProduct()
      .then((products) => {
        setProductsMayLike(helperToFindMayLikeProducts(products, gadgets));
      })
      .finally(() => setLoading(false));
  }, [gadgets]);

  return {
    category,
    itemId,
    loading,
    gadget,
    productsMayLike,
    gadgets,
  };
};
