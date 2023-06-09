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
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <ConnectedIntlProvider>
        <>{getLayout(<Component {...pageProps} />)};</>
      </ConnectedIntlProvider>
    </Provider>
  );
}
