import MainContent from './components/MainContent';
import './globals.css';

export const metadata = {
  title: 'Secrets in the Dark',
  description: 'An interactive murder mystery game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}