import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { firestore, auth } from '@/firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { showSuccess, showError } from '@/lib/toast';
import type { UserProfile } from '../types/userProfile';
import { t } from 'i18next';

export const useUserProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({ name: '', phone: '' });
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: profileData,
    isLoading: isLoadingProfile,
    isError,
  } = useQuery({
    queryKey: ['userProfile', currentUser?.uid],
    queryFn: async () => {
      if (!currentUser?.uid) return { name: '', phone: '' };
      const snapshot = await getDoc(doc(firestore, 'users', currentUser.uid));
      return snapshot.exists() ?
          {
            name: snapshot.data().name || currentUser.displayName || '',
            phone: snapshot.data().phone || '',
          }
        : { name: currentUser.displayName || '', phone: '' };
    },
    enabled: !!currentUser?.uid,
  });

  if (isError) {
    showError(t('toast.profileLoadError'));
  }

  useEffect(() => {
    if (profileData) setProfile(profileData);
  }, [profileData]);

  const handleSaveProfile = async () => {
    if (!currentUser?.uid) return;

    setIsSaving(true);
    try {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 5000),
      );

      await Promise.race([
        Promise.all([
          setDoc(
            doc(firestore, 'users', currentUser.uid),
            { name: profile.name, phone: profile.phone },
            { merge: true },
          ),
          auth.currentUser ?
            updateProfile(auth.currentUser, { displayName: profile.name })
          : Promise.resolve(),
        ]),
        timeout,
      ]);

      showSuccess(t('toast.dataSaved'));
    } catch {
      showError(t('toast.dataSaveError'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleNameChange = (name: string) =>
    setProfile((prev) => ({ ...prev, name }));

  const handlePhoneChange = (phone: string) =>
    setProfile((prev) => ({ ...prev, phone }));

  return {
    profile,
    isLoadingProfile,
    isSaving,
    currentUser,
    handleSaveProfile,
    handleNameChange,
    handlePhoneChange,
  };
};
