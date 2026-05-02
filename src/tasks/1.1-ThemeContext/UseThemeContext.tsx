import React from 'react';
import { useTheme } from './ThemeContext';

const UseContextTheme: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const panelStyle = {
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '2rem',
    textAlign: 'center' as const,
    transition: 'all 0.2s ease',
  };

  return (
    <>
    <div style={panelStyle}>
      <p>Текущая тема: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
    </>
  );
};

export default UseContextTheme;