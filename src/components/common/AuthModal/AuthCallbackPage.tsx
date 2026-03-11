import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@utils/supabaseClient';
import { Loader } from '@components/ui/Loader/Loader';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await supabase.auth.getSession();
        navigate('/profile');
      } catch (error) {
        console.error('Error during auth callback:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Loader />
    </div>
  );
};
