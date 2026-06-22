'use client';

import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { useTranslation } from '@/shared/hooks/useTranslation';
import { createClient } from '@/shared/lib/supabase/client';
import { Button } from '@/shared/ui/Button';
import { ProfileSkeleton } from '@/shared/ui/Skeleton';
import { BodyText, H2, H3 } from '@/shared/ui/Typography';
import { RecentlyViewedSlider } from '@/widgets/RecentlyViewedSlider';

const supabase = createClient();

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
        <H2 className="mb-8 ">{t('profileTitle')}</H2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border border-brand-elements bg-brand-surface-1 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-20 w-20 items-center justify-center bg-brand-elements text-2xl font-bold text-white shadow-md overflow-hidden">
                {user?.email?.[0].toUpperCase() || 'U'}
              </div>

              <H3 className="mt-4 text-(--color-brand-white)">
                {user?.user_metadata?.full_name || 'User'}
              </H3>
              <BodyText className="text-brand-secondary mt-1">
                {user?.email}
              </BodyText>
            </div>

            <hr className="my-6 border-brand-elements" />

            <Button
              variant="primary"
              type="button"
              onClick={handleLogout}
              className="h-10 w-full border border-brand-elements bg-brand-red px-3 py-1.5 text-xs font-semibold text-(--color-brand-white) transition-all hover:bg-brand-red hover:opacity-75"
            >
              {t('logout')}
            </Button>
          </div>

          <div className="md:col-span-2 border border-brand-elements bg-brand-surface-1 p-6 shadow-sm">
            <H3 className=" mb-4">{t('orderHistory')}</H3>

            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-brand-elements py-12 text-center">
              <BodyText className="text-brand-secondary">
                {t('noOrdersYet')}
              </BodyText>
              <BodyText className="text-brand-secondary mt-1">
                {t('orderHistoryDescription')}
              </BodyText>
            </div>
          </div>
        </div>
      </div>
      <div className="py-7 px-4">
        <RecentlyViewedSlider />
      </div>
    </>
  );
};

export default ProfilePage;
