import NextAuthProvider from '@/providers/NextAuthProvider';
import '../style/globals.css'
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
