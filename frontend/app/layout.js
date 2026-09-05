import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Evotec Forms',
  description: 'Full-stack form management system — Evotec technical assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Toaster position="top-right" gutter={12} />
      </body>
    </html>
  );
}
