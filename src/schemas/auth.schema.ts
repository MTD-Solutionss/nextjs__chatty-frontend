import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const registerSchema = yup.object().shape({
  email: yup.string().email().required('Please enter email'),
  username: yup.string().min(4).max(8).required('Please enter your username'),
  password: yup
    .string()
    .min(4)
    .max(8)
    .required('Please enter password with the length is 4-8 length')
});
export const registerResolver = yupResolver(registerSchema);

const loginSchema = yup.object().shape({
  username: yup.string().min(4).max(8).required('Please enter your username'),
  password: yup
    .string()
    .min(4)
    .max(8)
    .required('Please enter password with the length is 4-8 length')
});
export const loginResolver = yupResolver(loginSchema);

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required('Please enter email')
});
export const forgotPasswordResolver = yupResolver(forgotPasswordSchema);
