'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { createClient } from '@/shared/lib/supabase/client';
import { Button } from '@/shared/ui/Button';

type AuthMode = 'login' | 'register';

const supabase = createClient();

export const LoginPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const currentParams = new URLSearchParams(window.location.search);
    const targetRedirect = currentParams.get('next') || '/';

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        router.refresh();

        setTimeout(() => {
          window.location.assign(targetRedirect);
        }, 100);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage('Лист для підтвердження надіслано на вашу пошту!');
      }
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null);
    setIsLoading(true);

    const currentParams = new URLSearchParams(window.location.search);
    const targetRedirect = currentParams.get('next') || '/';
    const encodedNext = encodeURIComponent(targetRedirect);

    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodedNext}`,
      },
    });

    if (oAuthError) {
      setError(oAuthError.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black p-4 font-sans text-(--color-brand-white)">
      <div className="w-full max-w-md overflow-hidden border border-brand-elements bg-brand-surface-1 p-8 shadow-2xl transition-all">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            NICE <span className="text-brand-accent">GADGETS</span>
          </h1>
          <p className="mt-2 text-sm text-brand-secondary">
            {mode === 'login' ? t('welcome_back') : t('create_account')}
          </p>
        </div>

        <div className="mb-6 flex bg-brand-black p-1 border border-brand-elements">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`w-full py-2 text-sm font-medium transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-brand-surface-2 text-(--color-brand-white) shadow-sm'
                : 'text-brand-secondary hover:text-(--color-brand-white)'
            }`}
          >
            {t('login')}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`w-full py-2 text-sm font-medium transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-brand-surface-2 text-(--color-brand-white) shadow-sm'
                : 'text-brand-secondary hover:text-(--color-brand-white)'
            }`}
          >
            {t('register')}
          </button>
        </div>

        {error && (
          <div className="mb-4 border border-brand-red bg-brand-red/10 p-3 text-sm text-brand-red text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 border border-brand-green bg-brand-green/10 p-3 text-sm text-brand-green text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              {t('email')}
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-brand-elements bg-brand-black p-3 text-sm text-brand-white placeholder:text-brand-icons outline-none transition-all focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              {t('password')}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-brand-elements bg-brand-black p-3 text-sm text-brand-white placeholder:text-brand-icons outline-none transition-all focus:border-brand-accent focus:ring-1 focus:ring-brand-accent"
              required
            />
          </div>

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="mt-2 h-10 w-full bg-brand-accent py-3 text-sm font-bold tracking-wide text-white transition-all hover:bg-brand-accent-600 active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading
              ? t('loading')
              : mode === 'login'
                ? t('login')
                : t('register')}
          </Button>
        </form>

        <div className="my-6 flex items-center justify-between text-xs uppercase tracking-wider text-brand-icons">
          <span className="h-px w-full bg-brand-elements"></span>
          <span className="px-3 text-brand-secondary">{t('or')}</span>
          <span className="h-px w-full bg-brand-elements"></span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleOAuthLogin('google')}
            className="flex items-center justify-center gap-2 cursor-pointer border border-brand-elements bg-brand-surface-2 py-2.5 text-sm font-medium transition-all hover:bg-brand-elements"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.133 1 1.18 5.926 1.18 12s4.953 11 11.06 11c6.373 0 10.596-4.477 10.596-10.75 0-.725-.078-1.275-.175-1.688H12.24z"
              />
            </svg>
            Google
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleOAuthLogin('github')}
            className="flex items-center justify-center gap-2 cursor-pointer border border-brand-elements bg-brand-surface-2 py-2.5 text-sm font-medium transition-all hover:bg-brand-elements"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
