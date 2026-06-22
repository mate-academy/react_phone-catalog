'use client';

import { type UIMessage } from '@ai-sdk/react';
import { Headset, Send, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { useChat } from '@/features/GlobalChatWidget/model/useChat';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { BodyText } from '@/shared/ui/Typography';

interface GlobalChatWidgetProps {
  productData?: Record<string, unknown>;
}

export const GlobalChatWidget = ({ productData }: GlobalChatWidgetProps) => {
  const { t } = useTranslation();
  const { messages, sendMessage, isLoading, inputRef } = useChat(
    productData || {},
  );
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setIsOpen(false);
    }
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const isAiTyping =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1].role === 'user';

  return (
    <>
      {isOpen && (
        <div className="fixed z-2500 bottom-35 right-6 md:bottom-37.5 md:right-6 w-[calc(100vw-3rem)] sm:w-100 h-75 sm:h-125 bg-brand-surface-1 border border-brand-elements flex flex-col animate-in slide-in-from-bottom-5">
          <div className="relative bg-brand-surface-2 p-4 border-b border-brand-elements flex items-center h-14 shrink-0">
            <BodyText className="text-brand-white font-bold">
              Nice Gadgets AI
            </BodyText>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-3 text-brand-secondary hover:text-brand-white p-2 z-60 cursor-pointer"
            >
              <X size={20} className="pointer-events-none" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.length === 0 && (
              <BodyText className="text-brand-secondary text-center mt-auto mb-auto">
                {t('chatWidgetWelcomeMessage') ||
                  'Welcome! How can I assist you today?'}
              </BodyText>
            )}

            {messages.map((m: UIMessage, index: number) => {
              const textFromContent =
                'content' in m && typeof m.content === 'string'
                  ? m.content
                  : '';
              const textFromParts = Array.isArray(m.parts)
                ? m.parts
                    .map((p) =>
                      'text' in p && typeof p.text === 'string' ? p.text : '',
                    )
                    .join('')
                : '';
              const textFromRaw =
                'text' in m &&
                typeof (m as Record<string, unknown>).text === 'string'
                  ? ((m as Record<string, unknown>).text as string)
                  : '';
              const messageText =
                textFromContent || textFromParts || textFromRaw;

              if (!messageText) return null;

              return (
                <div
                  key={m.id || `fallback-id-${index}`}
                  className={`p-3 rounded-none max-w-[85%] ${m.role === 'user' ? 'bg-brand-accent self-end' : 'bg-brand-surface-2 self-start'}`}
                >
                  <div className="text-brand-white flex flex-col gap-2">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <BodyText>{children}</BodyText>,
                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 m-0 space-y-1">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="text-[14px] leading-relaxed">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                      }}
                    >
                      {messageText}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}

            {isAiTyping && (
              <div className="p-3 rounded-none bg-brand-surface-2 self-start flex gap-1 items-center h-10">
                <span className="w-1.5 h-1.5 bg-brand-secondary animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-secondary animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-brand-secondary animate-bounce"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={onSend}
            className="p-3 border-t border-brand-elements bg-brand-surface-1 flex gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                t('chatWidgetInputPlaceholder') || 'Type your message...'
              }
              className="flex-1 bg-brand-black border border-brand-elements rounded-none px-3 py-2 text-brand-white focus:outline-none focus:border-brand-accent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-accent p-2 rounded-none text-brand-white disabled:opacity-50 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <div className="fixed z-500 right-6 md:right-6 bottom-20 md:bottom-24">
        <button
          type="button"
          onClick={toggleChat}
          className="w-10.5 h-10.5 rounded-none bg-brand-accent hover:bg-brand-accent-600 flex items-center justify-center text-white transition-transform duration-200 hover:scale-105 cursor-pointer origin-center will-change-transform"
        >
          {isOpen ? (
            <X size={22} className="pointer-events-none" />
          ) : (
            <Headset size={22} className="pointer-events-none" />
          )}
        </button>
      </div>
    </>
  );
};
