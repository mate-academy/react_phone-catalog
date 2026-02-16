import { useTheme } from '../../hooks/useTheme';

export const ThemeSwitcher = () => {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-elements dark:border-dark-border bg-white dark:bg-dark-card-background"></div>
    );
  }

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-elements dark:border-dark-border bg-white dark:bg-dark-card-background cursor-pointer hover:border-primary dark:hover:border-purple hover:bg-hover dark:hover:bg-dark-hover transition-colors shadow-md"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <span className="text-lg">🌞</span>
      ) : (
        <span className="text-lg">🌚</span>
      )}
    </button>
  );
};
