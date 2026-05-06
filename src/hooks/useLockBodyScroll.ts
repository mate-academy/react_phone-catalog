import { useEffect } from 'react';

const BODY_LOCK_CLASS = 'no-scroll';
let lockCount = 0;

export function useLockBodyScroll(shouldLock: boolean) {
  useEffect(() => {
    if (shouldLock) {
      lockCount = Math.max(0, lockCount) + 1;
      if (lockCount === 1) {
        document.body.classList.add(BODY_LOCK_CLASS);
      }
    }

    return () => {
      if (shouldLock) {
        lockCount = Math.max(0, lockCount - 1);
        if (lockCount === 0) {
          document.body.classList.remove(BODY_LOCK_CLASS);
        }
      }
    };
  }, [shouldLock]);
}
