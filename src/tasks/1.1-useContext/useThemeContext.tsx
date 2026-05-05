import React from 'react';
import { useTheme } from './themeContext';

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
      <h2>1.1 - useContext</h2>
      <p>Текущая тема: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
    </>
  );
};

export default UseContextTheme;