import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXCUSES, STAMPS } from './constants/notFoundPage';
import { getRandomItem } from './helpers/getRandomItem';
import { useAccruingFine } from './hooks/useAccruingFine';
import { useReportBorrower } from './hooks/useReportBorrower';
import { NoticeHeader } from './components/NoticeHeader';
import { NoticeDetails } from './components/NoticeDetails';
import { NoticeActions } from './components/NoticeActions';
import { NoticeFooter } from './components/NoticeFooter';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const fine = useAccruingFine();
  const { isReported, reportCount, handleReport } = useReportBorrower();

  const [excuse] = useState(() => getRandomItem(EXCUSES));
  const [stamp] = useState(() => getRandomItem(STAMPS));

  const handleNavigateHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="bg-background max-w-lg w-full shadow-lg rounded-sm border border-border overflow-hidden">
        <NoticeHeader />

        <div className="px-8 py-7 relative">
          <NoticeDetails
            excuse={excuse}
            fine={fine}
            stamp={stamp}
          />
          <NoticeActions
            isReported={isReported}
            reportCount={reportCount}
            onNavigateHome={handleNavigateHome}
            onReport={handleReport}
          />
        </div>

        <NoticeFooter />
      </div>
    </div>
  );
};
