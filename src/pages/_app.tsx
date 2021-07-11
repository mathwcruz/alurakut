import { AppProps } from 'next/app';
import Router from 'next/router';
import Nprogress from 'nprogress';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
