import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

export const Cookie = () => {
  const { t } = useTranslation();

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'denied');
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="app_cookie_consent"
      style={{
        background: '#1a1a1ad4',
        alignItems: 'center',
        fontSize: '14px',
      }}
      buttonStyle={{
        background: '#2f80ed',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '4px',
        padding: '8px 16px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid #89939a',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '4px',
        padding: '8px 16px',
      }}
      onAccept={handleAccept}
      onDecline={handleDecline}
    >
      {t('cookies')}
    </CookieConsent>
  );
};
