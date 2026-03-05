import { TYPOGRAPHY } from '@/constants/typography';
import type { NoticeRowProps } from '../types/noticeRow';

export function NoticeRow({ label, value }: NoticeRowProps) {
  return (
    <div className="flex border-b border-border last:border-b-0">
      <span
        className={`w-36 shrink-0 bg-muted px-4 py-2.5 text-muted-foreground border-r border-border ${TYPOGRAPHY.uppercase}`}
      >
        {label}
      </span>
      <span className={`px-4 py-2.5 text-foreground ${TYPOGRAPHY.body}`}>
        {value}
      </span>
    </div>
  );
}
