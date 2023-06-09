import React, { ReactElement } from 'react';
import AuthLayout from '@components/layouts/auth-layout';
import type { NextPageWithLayout } from '@pages/_app';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslations } from '@utils/intlTools';
import { ROUTES } from '@constants/index';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { loginResolver } from '@schemas/index';
import { LoginForm } from '@custom-types/index';
import { useActions as useAuthActions, useStates as useAuthStates } from '@store/models/auth';
import { Status } from '@custom-types/index';
import _ from 'lodash';
const Login: NextPageWithLayout = () => {
  const { login } = useAuthActions();
  const { status, error } = useAuthStates();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: loginResolver });
  const [forgot_password, keep_sign_in, sign_in_button, sign_in_button_in_progress] =
    useTranslations([
      'forgot_password',
      'keep_sign_in',
      'sign_in_button',
      'sign_in_button_in_progress'
    ]);
  const onLogin = (loginForm: LoginForm) => {
    const { username, password } = loginForm;
    login({ username, password });
  };

  return (
    <div className="auth-inner">
      {status === Status.ERROR && (
        <div className="alerts alert-error" role="alert">
          {error.message}
        </div>
      )}
      <form className="auth-form" onSubmit={handleSubmit(onLogin)}>
        <div className="form-input-container">
          {errors.username && (
            <div className="alerts alert-error" role="alert">
              {errors.username.message}
            </div>
          )}
          <Input
            id="username"
            name="username"
            type="text"
            labelText="Username"
            placeholder="Enter username"
            register={register}
          />
          {errors.password && (
            <div className="alerts alert-error" role="alert">
              {errors.password.message}
            </div>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter password"
            register={register}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input id="checkbox" name="checkbox" type="checkbox" register={register} />
            {keep_sign_in}
          </label>
        </div>
        <Button
          label={status === Status.LOADING ? sign_in_button_in_progress : sign_in_button}
          className="auth-button button"
          disabled={!_.isEmpty(errors)}
        />
        <Link href={ROUTES.FORGOT_PASSWORD}>
          <span className="forgot-password">
            {forgot_password} <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};
Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
