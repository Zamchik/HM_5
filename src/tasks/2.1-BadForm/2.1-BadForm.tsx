import { useState, useRef } from 'react';

export default function BadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [agree, setAgree] = useState(false);

  // Счетчик ре-рендеров
  const renderCount = useRef(0);
  renderCount.current += 1;

  // валидация email через includes (не проверяет домен, точки, допустимые символы)
  const isValidEmail = (email: string) => email.includes('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (!firstName || !lastName) {
      alert('Имя и фамилия обязательны');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Email должен содержать @');
      return;
    }

    if (!agree) {
      alert('Необходимо принять условия');
      return;
    }
    // Имитация запроса к серверу
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Форма отправлена');
    } catch {
      alert('Ошибка сервера');
    }
  };

  return (
    <div>
      <h2>2.1 - BadForm</h2>
      <p>
        Счётчик ре-рендеров: <strong>{renderCount.current}{' '}</strong>
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Подтверждение пароля"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
        </select>
        <label>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          Принимаю условия
        </label>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}