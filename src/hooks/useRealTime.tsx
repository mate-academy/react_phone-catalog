import { useEffect, useRef } from 'react';
import { supabase } from '@utils/supabaseClient';

export const useSupportRealtime = (
  selectedUserId: string,
  onNewMessage: (msg: {
    role: string;
    text: string;
    created_at: string;
  }) => void,
) => {
  const callbackRef = useRef(onNewMessage);

  useEffect(() => {
    callbackRef.current = onNewMessage;
  }, [onNewMessage]);

  useEffect(() => {
    if (!selectedUserId) return;

    const channel = supabase
      .channel(`support-chat-${selectedUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages',
          filter: `user_id=eq.${selectedUserId}`,
        },
        (payload) => {
          callbackRef.current(
            payload.new as { role: string; text: string; created_at: string },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedUserId]);
};
