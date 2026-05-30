import React, { useEffect, useState } from 'react';
import { Footer } from '../HomePage/components/Footer';
import { Header } from '../HomePage/components/Header';
import { Gadget } from '../shared/types/Gadget';
import { GadgetsCollection } from './GadgetsCollection';
import { useProducts } from '../shared/context/ProductsContext';
import style from './GadgetPage.module.scss';
import { useSearchParams } from 'react-router-dom';
import { ProductSkeleton } from './ProductSkeleton';

type Props = {
  gadgets: Gadget[];
  category: string;
  title: string;
};

export const GadgetPage: React.FC<Props> = ({ gadgets, category, title }) => {
  const { products } = useProducts();
  const { loading, error } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const sortedGadgets = [...gadgets].sort((a, b) => {
    if (sortValue === 'age') {
      const productA = products.find(p => p.itemId === a.id);
      const productB = products.find(p => p.itemId === b.id);

      const yearA = productA ? productA.year : 0;
      const yearB = productB ? productB.year : 0;

      return yearB - yearA;
    }

    if (sortValue === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortValue === 'price') {
      return a.priceDiscount - b.priceDiscount;
    }

    return 0;
  });

  useEffect(() => {
    if (loading) {
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [gadgets, loading]);

  return (
    <>
      {error && !loading && !isLoading && (
        <div className={style.errorContainer}>
          <p className={style.error}>
            Something went wrong! Please reload the page!
          </p>
          <button
            className={style.button}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      )}
      {!error && !loading && !isLoading && !gadgets.length && (
        <div className={style.errorContainer}>
          <p className={style.error}>
            There are no {category.toLowerCase()} yet
          </p>
        </div>
      )}

      {!error && (
        <>
          <Header />
          <div className={style.container}>
            {loading || isLoading ? (
              <div className={style.skeletonContainer}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : (
              <GadgetsCollection
                gadgets={sortedGadgets}
                category={category}
                title={title}
              />
            )}
            <Footer />
          </div>
        </>
      )}
    </>
  );
};
