import { TYPOGRAPHY } from '@/constants/typography';
import { REPORT_LIMIT } from '../constants/notFoundPage';

interface NoticeActionsProps {
  isReported: boolean;
  reportCount: number;
  onNavigateHome: () => void;
  onReport: () => void;
}

export function NoticeActions({
  isReported,
  reportCount,
  onNavigateHome,
  onReport,
}: NoticeActionsProps) {
  return (
    <>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onNavigateHome}
          className={`flex-1 bg-foreground text-background py-3 px-5 rounded-sm hover:opacity-80 transition-opacity duration-150 cursor-pointer border-0 ${TYPOGRAPHY.buttons}`}
        >
          ← Return to Catalog
        </button>
        <button
          onClick={onReport}
          className={`flex-1 py-3 px-5 rounded-sm transition-all duration-150 cursor-pointer border-0 ${TYPOGRAPHY.buttons} ${
            isReported ?
              'bg-primary text-primary-foreground'
            : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
          }`}
        >
          {isReported ?
            `Reported! (×${reportCount})`
          : '🚨 Report the Borrower'}
        </button>
      </div>

      {reportCount >= REPORT_LIMIT && (
        <p className={`text-center text-ring mt-3 italic ${TYPOGRAPHY.small}`}>
          Okay we get it. We&#39;ve notified the authorities. And their mother
          again.
        </p>
      )}
    </>
  );
}
