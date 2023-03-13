import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import ConnectedIntlProvider from '@root/ConnectedIntl';
import '@styles/index.scss';
import '@styles/App.scss';

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
