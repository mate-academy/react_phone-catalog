import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminPage.module.scss';
import { Sidebar } from '@components/layout/SideBar';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { supabase } from '@utils/supabaseClient';
import { useSupportRealtime } from '@hooks/useRealTime';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  is_admin: boolean;
}

interface AdminOrder {
  id: string;
  user_id: string;
  status: string;
  total: number;
  date: string;
}

export const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  const [selectedUserId, setSelectedUserId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const [supportUsers, setSupportUsers] = useState<AdminUser[]>([]);
  const [conversation, setConversation] = useState<
    { role: string; text: string; created_at: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);

      const [
        { data: profilesData, error: profilesError },
        { data: ordersData, error: ordersError },
        { data: supportUserData, error: supportUserError },
      ] = await Promise.all([
        supabase.from('profiles').select('id, is_admin, email, created_at'),
        supabase
          .from('orders')
          .select('id, user_id, status, total, date')
          .order('date', { ascending: false }),
        supabase.from('support_messages').select('user_id').eq('role', 'user'),
      ]);

      if (profilesError) {
        setError(profilesError.message);
      } else {
        setUsers(
          profilesData.map((p) => ({
            id: p.id,
            is_admin: p.is_admin,
            email: p.email || '—',
            created_at: new Date(p.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          })),
        );
      }

      if (!ordersError && ordersData) {
        setOrders(
          ordersData.map((o) => ({
            ...o,
            date: new Date(o.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }),
          })),
        );
      }

      if (!supportUserError && supportUserData && profilesData) {
        const activeIds = new Set(supportUserData.map((m) => m.user_id));
        setSupportUsers(
          profilesData
            .filter((p) => activeIds.has(p.id))
            .map((p) => ({
              id: p.id,
              is_admin: p.is_admin,
              email: p.email || '—',
              created_at: new Date(p.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }),
            })),
        );
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useSupportRealtime(selectedUserId, (msg) => {
    setConversation((prev) => [...prev, msg]);
  });

  const toggleAdmin = async (userId: string, current: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !current })
      .eq('id', userId);
    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_admin: !current } : u)),
      );
    }
  };

  const fetchConversation = async (userId: string) => {
    const { data } = await supabase
      .from('support_messages')
      .select('role, text, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    if (data) setConversation(data);
  };

  const deleteUser = async (userId: string) => {
    if (!confirm(t('admin.confirm_delete'))) return;
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (!error) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  const sendSupportMessage = async () => {
    if (!selectedUserId || !messageText.trim()) return;
    setSending(true);
    const { error } = await supabase.from('support_messages').insert({
      user_id: selectedUserId,
      role: 'admin',
      text: messageText.trim(),
    });
    if (!error) setMessageText('');
    setSending(false);
  };

  if (loading) return <p>{t('auth.loading')}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePage__container}>
        <div className={styles.profilePage__layout}>
          <Sidebar />
          <main className={styles.profilePage__content}>
            <Breadcrumbs />
            <h1 className={styles.profilePage__title}>{t('admin.title')}</h1>
            <div className={styles.statCard}>
              <span className={styles.statCard__label}>
                {t('admin.total_users')}
              </span>
              <span className={styles.statCard__value}>{users.length}</span>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table__th}>{t('admin.table_id')}</th>
                    <th className={styles.table__th}>
                      {t('admin.table_email')}
                    </th>
                    <th className={styles.table__th}>
                      {t('admin.table_registered')}
                    </th>
                    <th className={styles.table__th}>
                      {t('admin.table_role')}
                    </th>
                    <th className={styles.table__th}>
                      {t('admin.table_actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className={styles.table__row}
                    >
                      <td
                        className={`${styles.table__td} ${styles.table__td_id}`}
                      >
                        {user.id.slice(0, 8)}...
                      </td>
                      <td className={styles.table__td}>{user.email}</td>
                      <td className={styles.table__td}>{user.created_at}</td>
                      <td className={styles.table__td}>
                        <span
                          className={`${styles.badge} ${user.is_admin ? styles.badge_admin : styles.badge_user}`}
                        >
                          {user.is_admin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className={styles.table__td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.actions__btn}
                            onClick={() => toggleAdmin(user.id, user.is_admin)}
                            disabled={user.id === currentUserId}
                          >
                            {user.is_admin ?
                              t('admin.btn_remove_admin')
                            : t('admin.btn_make_admin')}
                          </button>
                          <button
                            className={`${styles.actions__btn} ${styles.actions__btn_danger}`}
                            onClick={() => deleteUser(user.id)}
                            disabled={user.id === currentUserId}
                          >
                            {t('admin.btn_delete')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={styles.statCard}
              style={{ marginTop: 32 }}
            >
              <span className={styles.statCard__label}>
                {t('admin.total_orders')}
              </span>
              <span className={styles.statCard__value}>{orders.length}</span>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table__th}>
                      {t('checkout.summary')} ID
                    </th>
                    <th className={styles.table__th}>{t('admin.table_id')}</th>
                    <th className={styles.table__th}>
                      {t('admin.table_status')}
                    </th>
                    <th className={styles.table__th}>
                      {t('admin.table_total')}
                    </th>
                    <th className={styles.table__th}>
                      {t('admin.table_date')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className={styles.table__row}
                    >
                      <td
                        className={`${styles.table__td} ${styles.table__td_id}`}
                      >
                        {order.id.slice(0, 8)}...
                      </td>
                      <td
                        className={`${styles.table__td} ${styles.table__td_id}`}
                      >
                        {order.user_id.slice(0, 8)}...
                      </td>
                      <td className={styles.table__td}>
                        <span
                          className={`${styles.badge} ${styles[`badge_${order.status}`]}`}
                        >
                          {t(`orders.status_${order.status}`)}
                        </span>
                      </td>
                      <td className={styles.table__td}>
                        ${order.total.toFixed(2)}
                      </td>
                      <td className={styles.table__td}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={styles.statCard}
              style={{ marginTop: 32 }}
            >
              <span className={styles.statCard__label}>
                {t('admin.support_messages')}
              </span>
              <span className={styles.statCard__value}>
                {supportUsers.length}
              </span>
            </div>
            <div className={styles.supportBlock}>
              <h2 className={styles.supportBlock__title}>
                {t('admin.reply_title')}
              </h2>
              <div className={styles.supportBlock__field}>
                <label className={styles.supportBlock__label}>
                  {t('admin.reply_to')}
                </label>
                <select
                  className={styles.supportBlock__select}
                  value={selectedUserId}
                  onChange={(e) => {
                    setSelectedUserId(e.target.value);
                    fetchConversation(e.target.value);
                  }}
                >
                  <option value="">{t('admin.select_user')}</option>
                  {supportUsers.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              {conversation.length > 0 && (
                <div className={styles.conversation}>
                  {conversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`${styles.conversation__msg} ${msg.role === 'admin' ? styles.conversation__msg_admin : styles.conversation__msg_user}`}
                    >
                      <span className={styles.conversation__role}>
                        {msg.role === 'admin' ?
                          t('admin.you')
                        : t('admin.user')}
                      </span>
                      <p className={styles.conversation__text}>{msg.text}</p>
                      <span className={styles.conversation__time}>
                        {new Date(msg.created_at).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.supportBlock__field}>
                <label className={styles.supportBlock__label}>
                  {t('admin.table_actions')}
                </label>
                <textarea
                  className={styles.supportBlock__textarea}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={t('admin.placeholder')}
                  rows={5}
                />
              </div>
              <div className={styles.supportBlock__footer}>
                <button
                  className={styles.supportBlock__submit}
                  disabled={sending || !selectedUserId || !messageText}
                  onClick={sendSupportMessage}
                >
                  {t('admin.send')}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
