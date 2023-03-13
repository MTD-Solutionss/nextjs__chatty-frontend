import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslations } from '@utils/intlTools';
import { ROUTES } from '@constants/index';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import Link from 'next/link';

const Login = () => {
  const [forgot_password, keep_sign_in, sign_in_button] = useTranslations([
    'forgot_password',
    'keep_sign_in',
    'sign_in_button'
  ]);

  return (
    <div className="auth-inner">
      <div className="alerts" role="alert">
        Error message
      </div>
      <form className="auth-form">
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            labelText="Username"
            placeholder="Enter username"
          />
          <Input
            id="password"
            name="password"
            type="password"
            labelText="Password"
            placeholder="Enter password"
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input id="checkbox" name="checkbox" type="checkbox" />
            {keep_sign_in}
          </label>
        </div>
        <Button label={sign_in_button} className="auth-button button" disabled={true} />
        <Link href={ROUTES.FORGOT_PASSWORD}>
          <span className="forgot-password">
            {forgot_password} <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
