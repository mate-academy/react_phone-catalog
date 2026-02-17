import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { loadProducts } from '../data/products';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';

export const CatalogProducts = () => {
  const { category = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const page = Number(searchParams.get('page') || 1);
  const sort = searchParams.get('sort') || 'newest';
  const perPage = Number(searchParams.get('perPage') || 16);

  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  const updateParams = (params: any) => {
    setSearchParams({
      page: String(params.page ?? page),
      sort: params.sort ?? sort,
      perPage: String(params.perPage ?? perPage),
    });
  };

  const filtered = useMemo(() => {
    return products.filter(p => p.category === category);
  }, [products, category]);

  const sorted = useMemo(() => {
    const copy = [...filtered];

    if (sort === 'newest') copy.sort((a, b) => b.id.localeCompare(a.id));
    if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name));

    if (sort === 'price') {
      copy.sort((a, b) => {
        const aPrice = a.priceDiscount ?? a.priceRegular;
        const bPrice = b.priceDiscount ?? b.priceRegular;
        return aPrice - bPrice;
      });
    }

    return copy;
  }, [filtered, sort]);

  const start = (page - 1) * perPage;
  const visible = sorted.slice(start, start + perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  return (
    <div className="catalog">
      <button onClick={() => navigate(-1)} className="hero-back">
        Back
      </button>

      <h1 style={{
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        marginBottom: 25,
      }}>
        {category}
      </h1>

      <div style={{
        display: 'flex',
        gap: 40,
        marginBottom: 40,
        alignItems: 'center'
      }}>
        <select
          value={sort}
          onChange={e => updateParams({ sort: e.target.value, page: 1 })}
        >
          <option value="newest">Newest</option>
          <option value="name">By name</option>
          <option value="price">By price</option>
        </select>

        <select
          value={perPage}
          onChange={e => updateParams({ perPage: e.target.value, page: 1 })}
        >
          <option value={4}>4 per page</option>
          <option value={8}>8 per page</option>
          <option value={16}>16 per page</option>
          <option value={32}>32 per page</option>
          <option value={64}>64 per page</option>
        </select>
      </div>

      <div className="catalog-grid">
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => updateParams({ page: p })}
              className={p === page ? 'active-page' : ''}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};