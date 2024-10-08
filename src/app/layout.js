import NextAuthProvider from '@/providers/NextAuthProvider';
import '../style/globals.css'
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loader />}>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
