import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@utils/supabaseClient';
import styles from './AuthModal.module.scss';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(`Google error: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMessage(t('auth.fill_fields'));
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } =
      isRegistering ?
        await supabase.auth.signUp({ email: cleanEmail, password })
      : await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

    if (error) {
      setMessage(`${t('auth.error')}: ${error.message}`);
    } else {
      if (isRegistering) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (signInError) {
          setMessage(`Registered, but login failed: ${signInError.message}`);
          setLoading(false);
          return;
        }
      }

      setMessage(
        isRegistering ? t('auth.reg_success') : t('auth.login_success'),
      );

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    }

    setLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className={styles.title}>
          {isRegistering ? t('auth.create_account') : t('auth.sign_in_title')}
        </h2>

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          type="button"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google Logo"
          />
          {t('auth.continue_google')}
        </button>

        <div className={styles.divider}>{t('auth.or_email')}</div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input
            className={styles.input}
            type="email"
            placeholder={t('auth.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={loading}
          >
            {loading ?
              t('auth.loading')
            : isRegistering ?
              t('auth.sign_up')
            : t('auth.sign_in')}
          </button>
        </form>

        <p className={styles.toggleWrapper}>
          {isRegistering ? t('auth.already_have_acc') : t('auth.no_acc_yet')}

          <button
            className={styles.toggleBtn}
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMessage('');
            }}
          >
            {isRegistering ? t('auth.sign_in') : t('auth.sign_up')}
          </button>
        </p>

        {message && (
          <p
            className={`${styles.message} ${
              message.includes(t('auth.error')) ?
                styles['message--error']
              : styles['message--success']
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
