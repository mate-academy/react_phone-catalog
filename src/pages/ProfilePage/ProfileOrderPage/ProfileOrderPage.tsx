import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ProfileOrderPage.module.scss';
import { Sidebar } from '@components/layout/SideBar';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { Order, ProductFromDB } from '@/types/CartOrder';
import { supabase } from '@utils/supabaseClient';
import { Loader } from '@components/ui/Loader/Loader';
import { EmptyOrders } from '@components/ui/Profile/CartHistory/EmptyOrders/EmptyOrders';
import { OrderCard } from '@components/ui/Profile/CartHistory/OrderCard/OrderCard';

export const ProfileOrderPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError(t('checkout.error_login'));
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select(
          `
            id,
            date,
            status,
            total,
            order_items (
              id,
              name,
              price,
              quantity,
              product_id,
              products (
                image
              )
            )
          `,
        )
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        const format: Order[] = data.map((order) => ({
          id: order.id,
          date: new Date(order.date).toLocaleDateString(i18n.language, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status: order.status,
          total: order.total,
          items: order.order_items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity ?? 1,
            image:
              (item.products as unknown as ProductFromDB | null)?.image || '',
          })),
        }));

        setOrders(format);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [t, i18n.language]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePage__container}>
        <div className={styles.profilePage__layout}>
          <Sidebar />

          <main className={styles.profilePage__content}>
            <Breadcrumbs />
            <h1 className={styles.profilePage__title}>{t('orders.title')}</h1>

            {loading ?
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
            : error ?
              <p>{error}</p>
            : orders.length === 0 ?
              <EmptyOrders />
            : <div className={styles.orderList}>
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                  />
                ))}
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  );
};
