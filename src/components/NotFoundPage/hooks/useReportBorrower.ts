import { useState, useRef, useEffect } from 'react';
import { REPORT_COOLDOWN_MS } from '../constants/notFoundPage';

export function useReportBorrower() {
  const [isReported, setIsReported] = useState(false);
  const [reportCount, setReportCount] = useState(0);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    };
  }, []);

  function handleReport() {
    setIsReported(true);
    setReportCount((previous) => previous + 1);

    if (cooldownTimeoutRef.current) clearTimeout(cooldownTimeoutRef.current);
    cooldownTimeoutRef.current = setTimeout(
      () => setIsReported(false),
      REPORT_COOLDOWN_MS,
    );
  }

  return { isReported, reportCount, handleReport };
}
