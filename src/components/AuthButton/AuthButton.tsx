import { useAuth } from '../../hooks/useAuth';

export const AuthButton = () => {
  const { user, loading, handleSignIn, handleSignOut } = useAuth();

  if (loading) {
    return (
      <div className="px-1">
        <div className="animate-spin w-2 h-2 border-1 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="px-1">
        <button
          onClick={handleSignOut}
          className="w-10 h10  rounded-full overflow-hidden hover:opacity-80 transition-opacity"
          title="Вийти"
        >
          <img
            src={user.photoURL || ''}
            alt={user.displayName || 'User'}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="px-1">
      <button
        onClick={handleSignIn}
        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 transition-colors flex items-center justify-center"
        title="Увійти"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6   h-6   text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    </div>
  );
};
