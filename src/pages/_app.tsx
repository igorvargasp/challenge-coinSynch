import '@/styles/globals.scss';
import { Roboto } from 'next/font/google';
import type { AppProps } from 'next/app';

// Using variable to be easily accessible when styling
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${roboto.variable}`}
      style={{
        minHeight: '100vh'
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}
