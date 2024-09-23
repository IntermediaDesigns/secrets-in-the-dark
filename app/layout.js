import MainContent from './components/MainContent';
import { ThemeProvider } from './context/ThemeContext';
import './globals.css';

export const metadata = {
  title: 'Secrets in the Dark',
  description: 'An interactive murder mystery game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <MainContent>{children}</MainContent>
        </ThemeProvider>
      </body>
    </html>
  );
}