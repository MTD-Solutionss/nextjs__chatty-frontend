import React, { useState, ReactElement } from 'react';
import { useTranslations } from '@utils/intlTools';
import backgroundImage from './../../../assets/images/background.jpg';
import Login from '@pages/auth/login';
import Register from '@pages/auth/register';
import styles from './index.module.scss';

const SIGN_IN = 'SIGN_IN';
const SIGN_UP = 'SIGN_UP';
type PageType = typeof SIGN_IN | typeof SIGN_UP;
type AuthLayoutProps = { children: ReactElement };
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [pageType, setPageType] = useState<PageType>(SIGN_IN);
  const [sign_in_title, sign_up_title] = useTranslations(['sign_in_title', 'sign_up_title']);
  const handleSetPage = (pageType: PageType) => {
    setPageType(pageType);
  };
  return (
    <div
      className={styles['container-wrapper']}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles['environment']}>DEV</div>
      <div className={styles['container-wrapper-auth']}>
        <div className={styles['tabs']}>
          <div className="tabs-auth">
            <ul className={styles['tab-group']}>
              <li
                className={`tab ${pageType === SIGN_IN && 'active'}`}
                onClick={() => {
                  handleSetPage(SIGN_IN);
                }}
              >
                <button className="login">{sign_in_title}</button>
              </li>
              <li
                className={`tab ${pageType === SIGN_UP && 'active'}`}
                onClick={() => {
                  handleSetPage(SIGN_UP);
                }}
              >
                <button className="signup">{sign_up_title}</button>
              </li>
            </ul>
            {pageType === SIGN_IN && (
              <div className="tab-item">
                <Login />
              </div>
            )}
            {pageType === SIGN_UP && (
              <div className="tab-item">
                <Register />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
