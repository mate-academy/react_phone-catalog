export const isSameOriginReferrer = (): boolean => {
  try {
    return (
      !!document.referrer &&
      new URL(document.referrer).origin === window.location.origin
    );
  } catch {
    return false;
  }
};
