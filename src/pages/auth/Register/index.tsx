import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from '@utils/intlTools';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import { useStates as useAuthStates, useActions as useAuthActions } from '@store/models/auth';
import Utils from '@utils/utils.service';
import { Status } from '@custom-types/redux';
import { RegisterForm } from '@custom-types/index';
import { registerResolver } from '@root/schemas/auth.schema';
import _ from 'lodash';

const Register = () => {
  const { status, error } = useAuthStates();
  const { register: registerAccount } = useAuthActions();
  const [sign_up_button, sign_up_button_in_progress] = useTranslations([
    'sign_up_button',
    'sign_up_button_in_progress'
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>({ resolver: registerResolver });
  const onRegisterAccount = (formData: RegisterForm) => {
    try {
      const avatarColor = Utils.avatarColor();
      const avatarLetter = formData.username.charAt(0);
      const avatarImage = Utils.generateAvatar(avatarLetter, avatarColor);
      registerAccount({ ...formData, avatarColor, avatarImage });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-inner">
      {status === Status.ERROR && (
        <div className="alerts alert-error" role="alert">
          Error from slice
        </div>
      )}
      {status === Status.SUCCESS && (
        <div className="alerts alert-success" role="alert">
          Success from slice
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit(onRegisterAccount)}>
        <div className="form-input-container">
          {errors.email && (
            <div className="alerts alert-error" role="alert">
              {errors.email.message}
            </div>
          )}
          <Input
            id="email"
            name="email"
            type="text"
            labelText="Email"
            placeholder="Enter email"
            register={register}
          />
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
        </div>
        <Button
          label={status === Status.LOADING ? sign_up_button_in_progress : sign_up_button}
          className="auth-button button"
        />
      </form>
    </div>
  );
};

export default Register;
