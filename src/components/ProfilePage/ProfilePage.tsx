import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSingOut } from '@/firebase/auth';
import { cn } from '@/lib/utils';
import { TYPOGRAPHY } from '@/constants/typography';
import { useUserProfile } from './hooks/useUserProfile';
import { isGoogleAuthProvider } from './helpers/isGoogleAuthProvider';
import { PersonalDataSection } from './components/PersonalDataSection';
import { OrdersSection } from './components/OrdersSection';
import { SecuritySection } from './components/SecuritySection';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { DeleteAccountModal } from './components/DeleteAccountModal';

export const ProfilePage = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    profile,
    isLoadingProfile,
    isSaving,
    currentUser,
    handleSaveProfile,
    handleNameChange,
    handlePhoneChange,
  } = useUserProfile();

  const isGoogleUser = isGoogleAuthProvider(currentUser);

  const handleLogout = async () => {
    await doSingOut();
    navigate('/login', { replace: true });
  };

  const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);
  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-[1136px] px-4 md:px-6 py-8 md:py-12">
          <div className="mb-8">
            <h1 className={cn(TYPOGRAPHY.h2, 'text-foreground')}>
              Особистий кабінет
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {currentUser?.email}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <PersonalDataSection
              profile={profile}
              isLoadingProfile={isLoadingProfile}
              isSaving={isSaving}
              email={currentUser?.email || ''}
              displayName={currentUser?.displayName || ''}
              onNameChange={handleNameChange}
              onPhoneChange={handlePhoneChange}
              onSave={handleSaveProfile}
            />

            <OrdersSection />

            <SecuritySection
              isGoogleUser={isGoogleUser}
              onChangePassword={handleOpenPasswordModal}
              onLogout={handleLogout}
              onDeleteAccount={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={handleClosePasswordModal} />
      )}
      {isDeleteModalOpen && (
        <DeleteAccountModal onClose={handleCloseDeleteModal} />
      )}
    </>
  );
};
