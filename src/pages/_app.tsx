import { AppProps } from 'next/app';
import Router from 'next/router';
import Nprogress from 'nprogress';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'styles/global';
import { theme } from 'styles/theme';

Router.events.on('routeChangeStart', () => Nprogress.start());
Router.events.on('routeChangeComplete', () => Nprogress.done());
Router.events.on('routeChangeError', () => Nprogress.done());

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;
