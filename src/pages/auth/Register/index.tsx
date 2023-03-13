import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from '@utils/intlTools';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import {
  useStates as useRegisterStates,
  useActions as useRegisterActions
} from '@store/models/register';
import './index.scss';

type RegisterForm = {
  email: string;
  username: string;
  password: string;
};

const Register = () => {
  const { loading, errorMessage, alertType, hasError } = useRegisterStates();
  const { register: registerAccount } = useRegisterActions();
  const [sign_up_button] = useTranslations(['sign_up_button']);
  const { register, handleSubmit } = useForm<RegisterForm>();

  return (
    <div className="auth-inner">
      <div className="alerts" role="alert">
        Error message
      </div>
      <form
        className="auth-form"
        onSubmit={handleSubmit((data: any) => {
          console.log('here is data', data);
          registerAccount(data);
        })}
      >
        <div className="form-input-container">
          <Input
            id="email"
            name="email"
            type="text"
            labelText="Email"
            placeholder="Enter email"
            register={register}
          />
          <Input
            id="username"
            name="username"
            type="text"
            labelText="Username"
            placeholder="Enter username"
            register={register}
          />

          <Input
            id="password"
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter password"
            register={register}
          />
        </div>
        <Button label={sign_up_button} className="auth-button button" />
      </form>
    </div>
  );
};

export default Register;
