import { useContext, useEffect, useState, useMemo } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsType } from '../types/ProductsType';
import { Product } from '../types/ProductType';

type State = {
  categorie: Product[];
  loading: boolean;
  error: boolean;
};

export function useCategories(api: ProductsType) {
  const { loadCategory } = useContext(ProductsContext);

  const [state, setState] = useState<State>({
    categorie: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let isMounted = true;

    setState(prev => ({ ...prev, loading: true, error: false }));

    loadCategory(api)
      .then(results => {
        if (!isMounted) {
          return;
        }

        setState({
          categorie: results,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setState(prev => ({ ...prev, loading: false, error: true }));
      });

    return () => {
      isMounted = false;
    };
  }, [api, loadCategory]);

  const memoCategorie = useMemo(() => state.categorie, [state.categorie]);

  return {
    categorie: memoCategorie,
    loading: state.loading,
    error: state.error,
  };
}
