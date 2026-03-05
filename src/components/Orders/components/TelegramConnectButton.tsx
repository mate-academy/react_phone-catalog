import { TYPOGRAPHY } from '@/constants/typography';
import { Button } from '@/components/ui/button';
import { TELEGRAM_BOT_USERNAME } from '../constants/telegram';

interface TelegramConnectButtonProps {
  orderId: string;
}

export const TelegramConnectButton = ({
  orderId,
}: TelegramConnectButtonProps) => {
  const deepLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${orderId}`;

  return (
    <Button
      asChild
      variant="outline"
      className={`h-14 ${TYPOGRAPHY.buttons}`}
    >
      <a
        href={deepLink}
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2.5"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.779l-1.695 7.989c-.127.561-.46.698-.932.435l-2.57-1.893-1.24 1.194c-.137.137-.252.252-.517.252l.185-2.619 4.772-4.31c.208-.184-.045-.287-.32-.103L7.638 14.6l-2.523-.787c-.548-.172-.56-.548.115-.811l9.875-3.808c.457-.165.857.112.825.585z"
            fill="#229ED9"
          />
        </svg>
        Track order in Telegram
      </a>
    </Button>
  );
};
