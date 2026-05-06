import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type FormData } from './schema';

// Имитация api-запрса
const fakeApi = async (data: FormData): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === 'taken@example.com') {
        reject(new Error('EMAIL_TAKEN'));
      } else {
        resolve();
      }
    }, 1000);
  });
};

export default function GoodFormRHF() {
  // Счётчик ре-рендеров
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fakeApi(data);
      console.log('Успешная регистрация:', data);
      reset();
      alert('Регистрация прошла успешно!');
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: 'Этот email уже занят',
      });
    }
  };

  return (
    <div>
      <h2>2.2 - GoodForm (React Hook Form + Zod)</h2>
      <p>Счётчик ре-рендеров (должен расти только при submit / reset): <strong>{renderCount.current}</strong></p>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }} onSubmit={handleSubmit(onSubmit)} noValidate >
        <div>
          <label htmlFor="firstName"></label>
          <input
            placeholder='Имя'
            id="firstName"
            type="text"
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
            {...register('firstName')}
          />
          {errors.firstName && (
            <span id="firstName-error" role="alert" style={{ color: 'red' }}>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="lastName"></label>
          <input
            placeholder='Фамилия'
            id="lastName"
            type="text"
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
            {...register('lastName')}
          />
          {errors.lastName && (
            <span id="lastName-error" role="alert" style={{ color: 'red' }}>
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email"></label>
          <input
            placeholder='Email'
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            {...register('email')}
          />
          {errors.email && (
            <span id="email-error" role="alert" style={{ color: 'red' }}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            placeholder='Пароль'
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            {...register('password')}
          />
          {errors.password && (
            <span id="password-error" role="alert" style={{ color: 'red' }}>
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword"></label>
          <input
            placeholder='Подтверждение пароля'
            id="confirmPassword"
            type="password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby="confirmPassword-error"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span id="confirmPassword-error" role="alert" style={{ color: 'red' }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div>
          <select id="role" aria-invalid={!!errors.role} {...register('role')}>
            <option value="">Выберите роль</option>
            <option value="student">Студент</option>
            <option value="teacher">Преподаватель</option>
          </select>
          {errors.role && (
            <span id="role-error" role="alert" style={{ color: 'red' }}>
              {errors.role.message}
            </span>
          )}
        </div>

        <div>
          <label>
            <input type="checkbox" aria-invalid={!!errors.agree} {...register('agree')} />
            Принимаю условия
          </label>
          {errors.agree && (
            <span id="agree-error" role="alert" style={{ color: 'red' }}>
              {errors.agree.message}
            </span>
          )}
        </div>

        {/* Блокирование кнопки во время отправки */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}