import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import { ROUTES } from '@constants/index';
import { useTranslations } from '@utils/intlTools';
import { useForm } from 'react-hook-form';
import { forgotPasswordResolver } from '@schemas/auth.schema';
import { ForgotPasswordForm } from '@custom-types/auth';
import { authService } from '@services/api/auth/auth.service';
import { useFetchComponent } from '@hooks/useFetchComponent';
//fetch data directly in component
import _ from 'lodash';
import { Status } from '@custom-types/index';
const ForgotPassword = () => {
  const { useActions: useForgotPasswordActions, useStates: useForgotPasswordStates } =
    useFetchComponent<any, any>();
  const { status, data, error } = useForgotPasswordStates();
  const { fetchData: forgotPassword } = useForgotPasswordActions();
  const [forgot_password_title, back_to_login, forgot_password_button] = useTranslations([
    'forgot_password_title',
    'back_to_login',
    'forgot_password_button'
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordForm>({ resolver: forgotPasswordResolver });

  const onForgotPassword = async (forgotPasswordForm: ForgotPasswordForm) => {
    const { email } = forgotPasswordForm;
    console.log('forgotPasswordForm', forgotPasswordForm);
    forgotPassword(() => {
      return authService.forgotPassword(email);
    });
  };

  return (
    <div className="container-wrapper">
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs forgot-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">{forgot_password_title}</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {status === Status.SUCCESS && (
                  <div className="alerts alert-success" role="alert">
                    {data.message}
                  </div>
                )}
                {status === Status.ERROR && (
                  <div className="alerts alert-error" role="alert">
                    {error.message}
                  </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit(onForgotPassword)}>
                  {errors.email && (
                    <div className="alerts alert-error" role="alert">
                      {errors.email.message}
                    </div>
                  )}
                  <div className="form-input-container">
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      labelText="Email"
                      placeholder="Enter email"
                      register={register}
                    />
                  </div>
                  <Button label={forgot_password_button} className="auth-button button" />
                  <Link href={ROUTES.LOGIN}>
                    <span className="forgot-password">
                      <FaArrowLeft className="arrow-left" /> {back_to_login}
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
