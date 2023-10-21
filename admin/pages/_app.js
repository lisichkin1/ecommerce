import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
