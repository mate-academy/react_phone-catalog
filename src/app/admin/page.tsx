'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { createClient } from '@/shared/lib/supabase/client';
import { H2 } from '@/shared/ui/Typography';

const supabase = createClient();

interface Product {
  itemId: string;
  name: string;
  category: string;
  price: number;
  fullPrice: number;
  capacity: string;
  color: string;
}

const ITEMS_PER_PAGE = 15;

export const AdminPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = useCallback(async (page: number) => {
    setIsLoading(true);

    const from = (page - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, error, count } = await supabase
      .from('products')
      .select('itemId, name, category, price, fullPrice, capacity, color', {
        count: 'exact',
      })
      .order('name', { ascending: true })
      .range(from, to);

    if (error) {
      console.error('Помилка пагінації:', error.message);
    } else if (data) {
      setProducts(data);
      if (count !== null) setTotalCount(count);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  const handleDeleteProduct = async (itemId: string) => {
    if (!confirm(`Ви впевнені, що хочете повністю видалити товар: ${itemId}?`))
      return;

    setIsLoading(true);

    await supabase.from('product_details').delete().eq('id', itemId);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('itemId', itemId);

    if (error) {
      alert(`Помилка видалення: ${error.message}`);
      setIsLoading(false);
    } else {
      alert('Товар видалено!');
      fetchProducts(currentPage);
    }
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <H2 className="text-3xl pt-4 px-2 font-bold tracking-tight">
            Каталог товарів
          </H2>
        </div>
        <Link
          href="/admin/new"
          className="inline-flex items-center justify-center bg-brand-accent hover:bg-brand-accent-600 text-white text-sm font-bold py-2.5 px-5 transition-all active:scale-[0.98]"
        >
          + Додати новий товар
        </Link>
      </div>

      <section className="border border-brand-elements bg-brand-surface-1 shadow-md overflow-hidden">
        <div className="p-6 border-b border-brand-elements flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Усі товари в базі ({totalCount})
          </h2>
          <span className="text-xs text-brand-secondary">
            Сторінка {currentPage} з {totalPages || 1}
          </span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-brand-secondary text-sm">
            Завантаження...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-brand-elements bg-brand-black text-brand-secondary text-xs uppercase font-semibold">
                  <th className="p-4">ItemId (Slug)</th>
                  <th className="p-4">Назва</th>
                  <th className="p-4">Категорія</th>
                  <th className="p-4">Модифікація</th>
                  <th className="p-4">Ціна</th>
                  <th className="p-4 text-right">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-elements">
                {products.map((product) => (
                  <tr
                    key={product.itemId}
                    className="hover:bg-brand-surface-2/50 transition-all"
                  >
                    <td className="p-4 font-mono text-xs text-brand-accent">
                      {product.itemId}
                    </td>
                    <td className="p-4 font-medium text-white">
                      {product.name}
                    </td>
                    <td className="p-4 text-brand-secondary capitalize">
                      {product.category}
                    </td>
                    <td className="p-4 text-xs text-brand-secondary">
                      <span className="bg-brand-black px-2 py-1 mr-1 border border-brand-elements">
                        {product.capacity}
                      </span>
                      <span className="bg-brand-black px-2 py-1 border border-brand-elements">
                        {product.color}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-brand-green">
                      ${product.price}{' '}
                      <span className="text-xs line-through text-brand-secondary font-normal">
                        ${product.fullPrice}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteProduct(product.itemId)}
                        className="text-brand-red hover:text-red-400 font-medium text-xs border border-brand-red/20 hover:border-brand-red px-3 py-1 bg-brand-red/5 transition-all"
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t border-brand-elements bg-brand-black/30 flex items-center justify-between">
          <div className="text-xs text-brand-secondary">
            Показано {products.length} з {totalCount} товарів
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1.5 text-xs font-semibold uppercase border border-brand-elements bg-brand-surface-1 hover:bg-brand-surface-2 disabled:opacity-40 transition-all text-white"
            >
              ← Назад
            </button>
            <span className="px-3 py-1 text-sm font-mono border border-brand-elements bg-brand-surface-2 text-brand-accent font-bold">
              {currentPage}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages || isLoading}
              className="px-3 py-1.5 text-xs font-semibold uppercase border border-brand-elements bg-brand-surface-1 hover:bg-brand-surface-2 disabled:opacity-40 transition-all text-white"
            >
              Вперед →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
