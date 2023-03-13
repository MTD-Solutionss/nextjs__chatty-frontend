import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import ConnectedIntlProvider from '@root/ConnectedIntl';
import '@styles/Input.scss';
import '@styles/App.scss';
import '@styles/ResetPassword.scss';
import '@styles/Register.scss';
import '@styles/Login.scss';
import '@styles/ForgotPassword.scss';
import '@styles/AuthTabs.scss';
import '@styles/index.scss';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        <>
          <Component {...pageProps} />;
        </>
      </ConnectedIntlProvider>
    </Provider>
  );
}
