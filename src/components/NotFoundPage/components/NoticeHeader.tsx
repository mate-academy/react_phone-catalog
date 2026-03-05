import { TYPOGRAPHY } from '@/constants/typography';
import { LIBRARY_TITLE, REFERENCE_CODE } from '../constants/notFoundPage';

export function NoticeHeader() {
  return (
    <div className="bg-destructive px-8 py-4 flex items-center justify-between">
      <span className={`text-primary-foreground ${TYPOGRAPHY.uppercase}`}>
        {LIBRARY_TITLE}
      </span>
      <span className={`text-destructive/60 ${TYPOGRAPHY.small}`}>
        {REFERENCE_CODE}
      </span>
    </div>
  );
}
