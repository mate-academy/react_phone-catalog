import type React from 'react';
import './UnicornAssistant.css';
import { useCallback, useEffect, useRef, useState } from 'react';

import unicornImage from '../../images/unicorn/unicorn-assistant-2.png';
import { useTranslation } from 'react-i18next';

interface UnicornAssistantProps {
  interval?: number;
}

export const UnicornAssistant: React.FC<UnicornAssistantProps> = ({
  interval = 5000,
}) => {
  const { t } = useTranslation('unicorn');

  const [currentMessageIndex, setCurrentMessageIndex] = useState(1);

  // drag and drop states
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ bottom: 112, right: 20 });
  const offset = useRef({ x: 0, y: 0 }); // to store the mouse offset relative to an element
  const assistantRef = useRef<HTMLDivElement>(null); // a reference to the container element itself

  const allMessages: string[] = [];
  let i = 1;
  while (true) {
    const messageKey = `message${i}`;
    const message = t(messageKey, { defaultValue: '' });
    if (message === '' && i > 1) {
      break;
    }
    if (message === '' && i === 1) {
      break;
    }
    allMessages.push(message);
    i++;
  }

  useEffect(() => {
    if (allMessages.length === 0) {
      return; // Якщо немає повідомлень, не запускаємо таймер
    }

    const timer = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        // Якщо prevIndex дорівнює кількості повідомлень, повертаємося до 1, інакше збільшуємо
        return (prevIndex % allMessages.length) + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [allMessages.length, interval]);

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    if (assistantRef.current) {
      setIsDragging(true);

      const rect = assistantRef.current.getBoundingClientRect();
      offset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      assistantRef.current.style.zIndex = '1001';
      assistantRef.current.style.cursor = 'grabbing';
    }
  }, []);

  // mouse movement handler (drag and drop)
  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !assistantRef.current) return;

      // get the window dimensions
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;

      // get the dimensions of the element
      const rect = assistantRef.current.getBoundingClientRect();
      const elementWidth = rect.width;
      const elementHeight = rect.height;

      let newLeft = event.clientX - offset.current.x;
      let newTop = event.clientY - offset.current.y;

      // constrain the position so that the element does not go beyond the screen
      newLeft = Math.max(0, Math.min(newLeft, clientWidth - elementWidth));
      newTop = Math.max(0, Math.min(newTop, clientHeight - elementHeight));

      const newRight = clientWidth - (newLeft + elementWidth);
      const newBottom = clientHeight - (newTop + elementHeight);

      setPosition({
        bottom: newBottom,
        right: newRight,
      });
    },
    [isDragging],
  );

  // drag end handler (mouse button release)
  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    if (assistantRef.current) {
      assistantRef.current.style.zIndex = '1000'; // return normal z-index
      assistantRef.current.style.cursor = 'grab'; // return cursor
    }
  }, []);

  // add/remove global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  if (allMessages.length === 0) {
    return null;
  }

  return (
    <div
      ref={assistantRef}
      className="unicorn-assistant fixed flex flex-col items-end z-[1000]
        pointer-events-auto touch-action-none
        select-none will-change-[bottom,right] transition-none"
      style={{
        bottom: position.bottom,
        right: position.right,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={onMouseDown}
    >
      <div
        className="message-bubble bg-white border border-gray-200 rounded-bl-xl rounded-t-xl rounded-br-lg
          p-3 px-4 shadow-lg max-w-[250px] text-right
          mr-5 -mb-2.5 relative
          font-sans
          pointer-events-none animate-jump"
      >
        <p className="message-text text-sm text-gray-700 leading-normal">
          {t(`message${currentMessageIndex}`)}
        </p>
      </div>
      <img
        src={unicornImage}
        alt="Friendly Unicorn Assistant"
        className="unicorn-image w-30 h-auto mb-2.5 pointer-events-none animate-jump origin-bottom"
        draggable="false"
      />
    </div>
  );
};
