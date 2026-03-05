import { TYPOGRAPHY } from '@/constants/typography';

export function NoticeFooter() {
  return (
    <div className="bg-muted border-t border-border px-8 py-3 flex justify-between items-center">
      <span className={`text-ring ${TYPOGRAPHY.small}`}>
        Page status:{' '}
        <span className="text-destructive font-bold">404 — Missing</span>
      </span>
      <span className={`text-ring opacity-50 ${TYPOGRAPHY.small}`}>
        Est. return: never
      </span>
    </div>
  );
}
