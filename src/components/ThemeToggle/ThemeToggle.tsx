import { useEffect, useState } from 'react';
import { StyledWrapper } from './StyledWrapper';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <StyledWrapper>
      <div className="container">
        <label className="switch">
          <input
            role="switch"
            type="checkbox"
            className="switch__input"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            aria-label="Toggle dark mode"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="switch__icon switch__icon--light"
          >
            <g strokeLinecap="round" strokeWidth={1} stroke="#fff" fill="none">
              <circle r={2} cy={6} cx={6} />

              <g strokeDasharray="1.5 1.5">
                <polyline transform="rotate(0,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(45,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(90,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(135,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(180,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(225,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(270,6,6)" points="6 10,6 11.5" />
                <polyline transform="rotate(315,6,6)" points="6 10,6 11.5" />
              </g>
            </g>
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            className="switch__icon switch__icon--dark"
          >
            <g
              transform="rotate(-45,6,6)"
              strokeLinejoin="round"
              strokeWidth={1}
              stroke="#fff"
              fill="none"
            >
              <path
                d="
                m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4
                c.304,0,.598.041.883.105
                c-.995-.992-2.367-1.605-3.883-1.605
                C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5
                c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z"
              />
            </g>
          </svg>

          <span className="switch__sr">Dark Mode</span>
        </label>
      </div>
    </StyledWrapper>
  );
};
