import React from 'react';
import Input from '@components/Input';
import backgroundImage from '../../../assets/images/background.jpg';
import Button from '@components/Button/Button';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslations } from '@utils/intlTools';
import { ROUTES } from '@constants/index';
import './index.scss';

const ResetPassword = () => {
  const [reset_password_button, back_to_login, reset_password_title] = useTranslations([
    'reset_password_button',
    'back_to_login',
    'reset_password_title'
  ]);
  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">{reset_password_title}</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {/* <div className="alerts" role="alert">
                  Error message
                </div> */}
                <form className="reset-password-form">
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      labelText="New Password"
                      placeholder="New Password"
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <Button
                    label={reset_password_button}
                    className="auth-button button"
                    disabled={false}
                  />

                  <Link to={ROUTES.LOGIN}>
                    <span className="login">
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

export default ResetPassword;
