import * as yup from 'yup';

export const schema = yup.object({
  firstName: yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  lastName: yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  password: yup
    .string()
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Z]/, 'Нужна заглавная буква')
    .matches(/[0-9]/, 'Нужна цифра')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  role: yup.string().required('Выберите роль'),
  agree: yup.boolean().oneOf([true], 'Примите условия'),
});

export type FormData = yup.InferType<typeof schema>;