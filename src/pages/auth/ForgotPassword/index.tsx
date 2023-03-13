import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '@components/Input';
import Button from '@components/Button/Button';
import { ROUTES } from '@constants/index';
import { useTranslations } from '@utils/intlTools';
import './index.scss';

const ForgotPassword = () => {
  const [forgot_password_title, back_to_login, forgot_password_button] = useTranslations([
    'forgot_password_title',
    'back_to_login',
    'forgot_password_button'
  ]);
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
                {/* <div className="alerts" role="alert">
                  Error message
                </div> */}
                <form className="auth-form">
                  <div className="form-input-container">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      labelText="Username"
                      placeholder="Enter username"
                    />
                  </div>
                  <Button
                    label={forgot_password_button}
                    className="auth-button button"
                    disabled={true}
                  />
                  <Link to={ROUTES.LOGIN}>
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
