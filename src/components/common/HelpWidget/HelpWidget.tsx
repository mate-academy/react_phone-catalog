import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './HelpWidget.module.scss';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export const HelpWidget = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLButtonElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target as Node) &&
        bubbleRef.current &&
        !bubbleRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const addWelcomeMessage = () => {
    setMessages((prev) => {
      if (prev.length > 0) return prev;

      return [
        {
          id: Date.now(),
          text: t('help_widget.welcome'),
          sender: 'bot',
        },
      ];
    });
  };

  const getBotReply = () => {
    const replies = t('help_widget.bot_replies', {
      returnObjects: true,
    }) as string[];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const botReply: Message = {
        id: Date.now(),
        text: getBotReply(),
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botReply]);
      setUnreadCount((prev) => (isOpen ? prev : prev + 1));
    }, 1200);
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;

      if (next) {
        setUnreadCount(0);
        addWelcomeMessage();
      }

      return next;
    });
  };

  return (
    <>
      <button
        ref={bubbleRef}
        className={s.bubble}
        onClick={handleToggle}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H9l-5 4V7z" />
        </svg>

        {unreadCount > 0 && <span className={s.badge}>{unreadCount}</span>}
      </button>

      {isOpen && (
        <div
          className={s.chat}
          ref={chatRef}
        >
          <div className={s.header}>
            <span>{t('help_widget.title')}</span>

            <button
              className={s.close}
              onClick={() => setIsOpen(false)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                />
                <line
                  x1="6"
                  y1="18"
                  x2="18"
                  y2="6"
                />
              </svg>
            </button>
          </div>

          <div className={s.body}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${s.message} ${
                  msg.sender === 'user' ? s.user : s.bot
                }`}
              >
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className={`${s.message} ${s.bot}`}>
                <span className={s.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={s.footer}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('help_widget.placeholder')}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};
