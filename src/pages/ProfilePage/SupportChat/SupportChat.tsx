import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SupportChat.module.scss';
import { Sidebar } from '@components/layout/SideBar';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { supabase } from '@utils/supabaseClient';
import { useSupportRealtime } from '@hooks/useRealTime';

interface Message {
  id: string;
  role: 'user' | 'admin';
  text: string;
  created_at: string;
}

export const SupportChat: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setUserId(user.id);
      supabase
        .from('support_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at')
        .then(({ data }) => data && setMessages(data));
    });
  }, []);

  useSupportRealtime(userId ?? '', (msg) => {
    setMessages((prev) => [...prev, msg as Message]);
  });

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed || !userId) return;

    setText('');
    const isFirstMessage = messages.length === 0;

    await supabase
      .from('support_messages')
      .insert({ user_id: userId, role: 'user', text: trimmed });

    if (isFirstMessage) {
      await supabase.from('support_messages').insert({
        user_id: userId,
        role: 'admin',
        text: t('help_widget.bot_replies.0'),
      });
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profilePage__container}>
        <div className={styles.profilePage__layout}>
          <Sidebar />
          <main className={styles.profilePage__content}>
            <Breadcrumbs />
            <h1 className={styles.profilePage__title}>
              {t('profile_sidebar.chat')}
            </h1>
            <div className={styles.chat}>
              <div className={styles.messages}>
                {messages.length === 0 && (
                  <p className={styles.empty}>{t('help_widget.welcome')}</p>
                )}
                {messages.map((msg) => (
                  <React.Fragment key={msg.id}>
                    <div
                      className={`${styles.bubble} ${styles[`bubble--${msg.role}`]}`}
                    >
                      {msg.text}
                    </div>
                    <span
                      className={`${styles.time} ${styles[`time--${msg.role}`]}`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </React.Fragment>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className={styles.inputArea}>
                <textarea
                  className={styles.textarea}
                  placeholder={t('help_widget.placeholder')}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  className={styles.sendBtn}
                  onClick={handleSend}
                  disabled={!text.trim()}
                >
                  ↑
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
