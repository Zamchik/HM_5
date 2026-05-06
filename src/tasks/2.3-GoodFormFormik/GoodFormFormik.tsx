import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { schema, type FormData } from './schema';

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

export default function GoodFormFormik() {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });

  const formik = useFormik<FormData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      agree: false,
    },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        await fakeApi(values);
        resetForm();
        alert('Регистрация успешна!');
      } catch {
        setFieldError('email', 'Этот email уже занят');
      }
    },
  });

  return (
    <div>
      <h2>2.3 - GoodForm (Formik + Yup)</h2>
      <p>
        Счётчик ре-рендеров (растёт при каждом вводе, в отличие от RHF):{' '}
        <strong>{renderCount.current}</strong>
      </p>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}
        onSubmit={formik.handleSubmit}
        noValidate
      >

        <div>
          <label htmlFor="firstName"></label>
          <input
            placeholder="Имя"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            aria-invalid={!!(formik.touched.firstName && formik.errors.firstName)}
            aria-describedby="firstName-error"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <span id="firstName-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.firstName}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="lastName"></label>
          <input
            placeholder="Фамилия"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            aria-invalid={!!(formik.touched.lastName && formik.errors.lastName)}
            aria-describedby="lastName-error"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <span id="lastName-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.lastName}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email"></label>
          <input
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            aria-invalid={!!(formik.touched.email && formik.errors.email)}
            aria-describedby="email-error"
          />
          {formik.touched.email && formik.errors.email && (
            <span id="email-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.email}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="password"></label>
          <input
            placeholder="Пароль"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            aria-invalid={!!(formik.touched.password && formik.errors.password)}
            aria-describedby="password-error"
          />
          {formik.touched.password && formik.errors.password && (
            <span id="password-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.password}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword"></label>
          <input
            placeholder="Подтверждение пароля"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            aria-invalid={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
            aria-describedby="confirmPassword-error"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <span id="confirmPassword-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>

        <div>
          <select
            id="role"
            name="role"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            aria-invalid={!!(formik.touched.role && formik.errors.role)}
          >
            <option value="">Выберите роль</option>
            <option value="student">Студент</option>
            <option value="teacher">Преподаватель</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <span id="role-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.role}
            </span>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="agree"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.agree}
              aria-invalid={!!(formik.touched.agree && formik.errors.agree)}
            />
            Принимаю условия
          </label>
          {formik.touched.agree && formik.errors.agree && (
            <span id="agree-error" role="alert" style={{ color: 'red' }}>
              {formik.errors.agree}
            </span>
          )}
        </div>

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}