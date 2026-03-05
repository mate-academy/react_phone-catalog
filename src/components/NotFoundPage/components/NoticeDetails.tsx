import { TYPOGRAPHY } from '@/constants/typography';
import { NoticeRow } from './NoticeRow';

interface NoticeDetailsProps {
  excuse: string;
  fine: number;
  stamp: string;
}

export function NoticeDetails({ excuse, fine, stamp }: NoticeDetailsProps) {
  return (
    <>
      <div
        className={`absolute top-6 right-6 border-4 border-destructive text-destructive px-3 py-1 rotate-12 opacity-80 select-none ${TYPOGRAPHY.uppercase}`}
      >
        {stamp}
      </div>

      <p className={`text-ring mb-1 ${TYPOGRAPHY.uppercase}`}>
        Official Notice
      </p>

      <h1
        className={`text-foreground font-black leading-tight mb-6 ${TYPOGRAPHY.h3}`}
      >
        This page has been
        <br />
        <span className="text-destructive">borrowed and not returned.</span>
      </h1>

      <div className="border border-border rounded-sm mb-6 overflow-hidden">
        <NoticeRow
          label="Borrower"
          value={
            <span className="font-mono font-bold">
              definitely_not_a_bookworm_42
            </span>
          }
        />
        <NoticeRow
          label="Checked out"
          value="January 3, 2019"
        />
        <NoticeRow
          label="Due date"
          value="January 17, 2019"
        />
        <NoticeRow
          label="Their excuse"
          value={<span className="text-muted-foreground italic">{excuse}</span>}
        />
        <NoticeRow
          label="Fine accrued"
          value={
            <span className="font-black text-destructive font-mono tabular-nums">
              ${fine.toFixed(2)}
              <span
                className={`text-destructive/50 ml-1 font-normal ${TYPOGRAPHY.small}`}
              >
                (live)
              </span>
            </span>
          }
        />
      </div>

      <p
        className={`text-ring leading-relaxed mb-7 border-l-2 border-border pl-3 ${TYPOGRAPHY.body}`}
      >
        We have sent{' '}
        <strong className="text-muted-foreground">14 reminder emails</strong>,
        dispatched{' '}
        <strong className="text-muted-foreground">2 carrier pigeons</strong>,
        and contacted{' '}
        <strong className="text-muted-foreground">their mother</strong>. No
        response.
      </p>
    </>
  );
}
